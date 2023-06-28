const express = require('express');
const { ObjectId } = require('mongodb');
const { MongoClient } = require('mongodb');

// Create an Express application
const app = express();
let db;

// Middleware to parse json data
app.use(express.json())

// MongoDB connection URI
const uri = 'mongodb://mongo:27017/mydatabase';

async function dbConnect() {
// Connect to MongoDB
  const client = await MongoClient.connect(uri);
  console.log('Connected to MongoDB');
  db = await client.db('mydatabase');
}

// Define a route handler for the root path
app.get('/vehicles', (req, res) => {
    db.collection('vehicles').find().toArray().then((docs) => {
      res.json(docs);
    }).catch(err => {
      console.error('Failed to fetch documents from MongoDB:', err);
      res.status(500).send('Internal Server Error');
    })
});

app.post('/vehicles', (req, res) => {
  const body = req.body
  console.log(body);
  db.collection('vehicles').insertOne(body).then(()=> {
    res.status(201).send({success: true});
  }).catch(err => {
    console.error('Failed to insert vehicle to MongoDB:', err);
    res.status(500).send('Internal Server Error');
  })
});

app.get('/vehicles/:key', (req, res) => {
    // Check if key is an object id first before passing to generic find
    if (ObjectId.isValid(req.params.key)) {
        db.collection('vehicles').findOne({_id: new ObjectId(req.params.key)}).then((doc) => {
            res.json(doc);
        }).catch(err => {
            console.error('Failed to fetch document from MongoDB:', err);
            res.status(500).send('Internal Server Error');
        })
    } else {    // Generic find
        db.collection('vehicles').find(
            {
                "$or":[
                    {VIN:{$regex:req.params.key}},
                    {Make:{$regex:req.params.key}},
                    {Model:{$regex:req.params.key}},
                    {Year:{$regex:req.params.key}},
                    {PlateNumber:{$regex:req.params.key}},
                    {PlateState:{$regex:req.params.key}},
                    {"Customer.LastName":req.params.key},
                    {"Customer.DLNumber":req.params.key},
                    {Shop:req.params.key}
                ]
            }
        ).toArray().then((docs) => {
            res.status(200).json(docs);
        }).catch(err => {
            res.status(400).send('Bad Request');
        });
    }
});

app.put('/vehicles/:id', (req, res) => {
    const body = req.body;
    db.collection('vehicles').updateOne({_id:new ObjectId(req.params.id)}, {$set: body}).then(() => {
        res.status(200).send({success: true});
    }).catch(err => {
        console.error('Failed to update document from MongoDB:', err);
        res.status(500).send('Internal Server Error');
    })
});

app.delete('/vehicles/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection('vehicles').deleteOne({_id: new ObjectId(req.params.id)}).then(() => {
            res.status(200).send({success: true});
        }).catch(err => {
            console.error('Failed to find document from MongoDB:', err);
            res.status(500).send('Internal Server Error');
        })
    } else {
        res.status(500).json({error: 'Not valid ID'});
    }
});

// Start the server on port 3000
app.listen(3000, () => {
  dbConnect().then (() => {
    console.log('Server is running on port 3000');
  });
});


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
  /*const result = await db.collection('vehicles').insertOne(
    {
        Make: 'scion',
        Model: 'xB',
    }
  );
  console.log(result);*/
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

app.get('/vehicles/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection('vehicles').findOne({_id: new ObjectId(req.params.id)}).then((doc) => {
            res.json(doc);
        }).catch(err => {
            console.error('Failed to fetch document from MongoDB:', err);
            res.status(500).send('Internal Server Error');
        })
    } else {
        res.status(500).json({error: 'Not valid ID'});
    }
});

app.post('/vehicles', (req, res) => {
  const body = req.body
  console.log(body);
  db.collection('vehicles').insertOne(body).then((docs) => {
    res.status(201).send({success: true});
  }).catch(err => {
    console.error('Failed to insert vehicle to MongoDB:', err);
    res.status(500).send('Internal Server Error');
  })
});

app.put('vehicles/:id', (req, res) => {
    const body = req.body
    //TODO Work on this method
    db.collection('vehicles').findOneAndUpdate(req.params.id, {
        VIN: req.body.VIN
    });
    res.status(201).send({success: true});
})

app.delete('/vehicles/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {
        db.collection('vehicles').deleteOne({_id: new ObjectId(req.params.id)}).then((doc) => {
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


const http = require('http');
const soap = require('soap');
const express = require('express');
const bodyParser = require('body-parser');

var myService = {
    MyService: {
        MyPort: {
            PartLookup: function(args) {
                return {
                    price: '$268.74',
                    deliverydate: '08/4/2023'
                };
            },
        }
    }
};

var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

//express server example
var app = express();
//body parser middleware are supported (optional)
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));

app.listen(8000, function(){
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    const server = soap.listen(app, '/PartLookup', myService, xml, function(){
        console.log('server initialized');
    });
    server.log = (type, data)  => {
        console.log(`Got something ${type} ${data}`);
    }
});
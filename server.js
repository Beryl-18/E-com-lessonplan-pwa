//importing necessary dependencies
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

//connecting to mongodbclient
let db; 
MongoClient.connect('mongodb+srv://beryl3145:berylabeysam@cluster0.ocqvc.mongodb.net/3145',(err,client) => {
    db = client.db('3145');
})

app.use(express.json());


//handling the collection request
app.param('collectionName', function(req, res, next){
    req.collection = db.collection(collectionName);
    return next();

});

//retrieving and sending collection requests
app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((e,results) =>{
        if (e) next (e)
        res.send(results);
    })
});

//creating a default get request handler
app.get('/', function (request,response){
    response.send("please select a route - eg. /collection/collectionName");
})

//handling post insert requests
app.post('/collection/:collectionName', (req, res, next) =>{
    req.collectionName.insert(req.body, (e,results) =>{
        if(e) next (e)
        res.send(results.ops)
    })
})

app.listen(3000);
//importing necessary dependencies
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

//using cors
app.use(cors());

//connecting to mongodbclient
let db; 
MongoClient.connect('mongodb+srv://beryl3145:berylabeysam@cluster0.ocqvc.mongodb.net/3145',(err,client) => {
    db = client.db('3145');
})

//handling the collection request
app.param('collectionName', function(req, res, next, collectionName){
    req.collection = db.collection(collectionName);
    return next();

});

//express json parser
app.use(express.json());

//Middleware Logger
app.use('/', (req,res,next) => {
    console.log("Request url : "+req.url);
    console.log("Request Method : "+req.method);
    next();
});

//default request
app.get('/', (req,res) =>{
    res.send("please select a /collection");
})

//retrieving and sending collection requests
app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((e,results) =>{
        if (e) next (e)
        res.send(results);
    })
});

//retrieving a single item from collectionName
const ObjectID = require('mongodb').ObjectID;
app.get('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.findOne({ _id: new ObjectID(req.params.id) }, (e, result) => {
            if (e) return next(e)
            res.send(result);
        }) 
});

//creating a default get request handler
app.get('/collection', function (request,response){
    response.send("please select a route - eg. /collection/collectionName");
})

//handling post insert requests
app.post('/collection/:collectionName', (req, res, next) =>{
    req.collection.insertOne(req.body, (e,results) =>{
        if(e) next (e)
        res.send(results.ops)
    })
})

//handling update requests for spaces
app.put('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.updateOne(
      {_id: new ObjectID(req.params.id)},
      {$set: req.body},
      {safe: true, multi: false},
      (e, result) => {
        if (e) return next(e)
        res.send(result.modifiedCount === 1 ? {msg: "success"} : {msg: "error"})
      })
  })

//App Listening at port 3000
const port = process.env.PORT || 3000;
app.listen(port, function (){
    console.log("Server is running at port 3000");
});
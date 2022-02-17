const express = require('express');
const app = express();

//handlng get request
app.get('/', function (request,response){
    console.log("Request for Method : " + request.method);
    console.log("Request for URL : "+ request.url);

    if (request.query.remove != null) {
        console.log("Query: "+ request.query.q);
    }
});

//handling post requests
app.post('/collection/:collectionid', function (request,response){
    console.log("Request for Method : " + request.method);
    console.log("Request for URL : "+ request.url);
    console.log("collection id "+request.params.collectionid);
    
    response.end("collection requested :"+request.params.collectionid);
});


//handling put requests
app.put('/', function (request,response){
    console.log("Request for Method : " + request.method);
    console.log("Request for URL : "+ request.url);
});


app.listen(3000);

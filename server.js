const express = require('express');
const http = require('http');

//starting a new express app
const app = express();

app.use(function (request,response, next){

    console.log("comes a request for "+request.url + "With method "+ request.method);
    next();
})

app.use(function(request,response){
    response.end("happy valentine's day at request " + request.url);
})


http.createServer(app).listen(3000);
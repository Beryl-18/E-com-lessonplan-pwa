const express = require('express');
const http = require('http');

//starting a new express app
const app = express();

// app.get("/error", function (request, response){
//     console.log("invalid entry");
//     response.end("sorry boss");
// })

// app.get("/checkingorigin",function (request,response, next){

//     console.log("comes a request for "+request.url + "With method "+ request.method);
//     next();

// });
// app.use(function(request,response){
//     response.end("happy valentine's day at request " + request.url);
// });

app.get("/hello",function(request, response){
    var q = request.query.search;
    console.log(q);
    response.send(q);

});


http.createServer(app).listen(3000);
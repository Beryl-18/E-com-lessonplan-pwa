const express = require('express');


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

//Middlware that logs all incoming requests
app.use('/',function(request,response){
    console.log("REQUEST URL: " + request.url);
    console.log("REQUEST METHOD: " + request.method);
    
});


app.listen(3000);
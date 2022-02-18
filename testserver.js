const express=  require('express');
const app = express();
const cors = require('cors');
var tempjson = '{"name":"hello", "password":"unknown"}';

app.use(cors());

app.use(express.json());

app.get('/',function (request,response){
    console.log("Method type: "+request.method);
    console.log(JSON.parse(tempjson));
    response.end((tempjson));
    
})

app.listen(3000, function(){
    console.log("app's started at 3000")
});

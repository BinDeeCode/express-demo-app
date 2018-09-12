var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req,res){
 res.send('All notes');
});

app.post('/', function (req,res){
    console.log(req.body);
    res.send("Add new note");
});




app.listen(port, function(){
console.log('App listen on port ' + port);
});
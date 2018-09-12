var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req,res){
 res.send('All notes WORK !');
});

app.post('/', function (req,res){
    console.log(req.body);
    res.send("Add new note WORK !");
});




app.listen(port, function(){
console.log('App listen on port ' + port);
});
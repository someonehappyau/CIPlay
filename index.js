/**
 * Created by jdai on 23/01/2017.
 */
var express=require('express');
var path=require('path');
var bodyParser = require('body-parser');
var fs=require('fs');
var moment=require('moment');
var shell=require('shelljs');

var DATA_PATH=path.join(__dirname,'data/records');

if (fs.existsSync(DATA_PATH)===false){
    shell.mkdir('-p',DATA_PATH);
}

var app=express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/record', function(req, res){
    console.log(req.body.info);
    var now=Date.now();
    var fileName=moment().format('YYYYMMDDHHmmsszzzSSS')+'.txt';
    fs.writeFileSync(path.join(DATA_PATH, fileName), req.body.info);
    res.status(200).end();
});

app.use(express.static(path.join(__dirname,'public')));
app.listen('3002');
console.log('listening at port 3002.');

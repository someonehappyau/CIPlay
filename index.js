/**
 * Created by jdai on 23/01/2017.
 */
var express=require('express');

var app=express();

app.get('/', (req, res)=>{
    res.status(200).end('Hello CI world.\nIt\'s a nice day!\nHey!');
});

app.listen('3002');
console.log('listening at port 3002.');
/**
 * Created by jdai on 23/01/2017.
 */
var express=require('express');
var path=require('path');
var bodyParser = require('body-parser');
var fs=require('fs');
var moment=require('moment');
var shell=require('shelljs');

var mysql      = require('mysql');

function getConnection() {
    return mysql.createConnection({
        host: 'mysql',
        user: 'usertest',
        password: 'iamtester',
        database: 'test'
    });
}

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

    var connection=getConnection();

    connection.connect();

    connection.query('insert into ?? set ?',['record',{content:req.body.info}], function(err, result){
        if (err){
            res.status(500).end(JSON.stringify(err));
        }
        else{
            res.redirect('/');
        }
        connection.end();
    });

});

app.get('/records', function(req, res){
    console.log('records.');

    var connection=getConnection();
    
    connection.connect();
    connection.query('select * from record', function(err, result){
        if (err){
            res.status(500).end();
        }
        else{
            var html='<ul>';
            result.forEach(function(data){
                html+='<li>'+data.id+'\t'+data.content+'\t'+moment(data.date_created).format('YYYY-MM-DD HH:mm:ss')+'</li>';
            });
            html+='</ul>';
            res.status(200).end(html);
        }
        connection.end();
    })
});

app.use(express.static(path.join(__dirname,'public')));

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).end('Somthing goes wrong.');
});

app.listen('3002');
console.log('listening at port 3002.');

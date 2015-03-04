var sql = require('mssql');

var config = {
    user: 'sa',
    password: 'agile_123',
    server: '54.225.232.25', // You can use 'localhost\\instance' to connect to named instance
    database: 'Reach',

    options: {
        encrypt: false // Use this if you're on Windows Azure
    }
}

var express = require('express');
var app = express();

app.use(function(req, res, next) {
res.setHeader("Access-Control-Allow-Origin", "*");
return next();
});

app.use(express.static(__dirname +'/html'));

console.log("Registering endpoint: /");
app.get('/', function(req, res){
    res.send('hello ROOT world');
});
 
console.log("Registering endpoint: /score");
app.get('/score', function(req, res){
    res.header("content-type: application/json");
    var data = [];

    var connection = new sql.Connection(config, function(err) {
        // ... error checks
        if (err) {
            data = "Error: Database connection failed!";
            console.log("Database connection failed!"); 
            return; 
        }

        // Query
        var request = new sql.Request(connection); // or: var request = connection.request();
        request.query('SELECT Score, count(*) as Total FROM AnalyticsOutput group by score', function(err, recordset) {
            // ... error checks
            if (err) { 
            data = "Error: Database connection failed!";
            console.log("Query failed!"); 
            return; 
            }

            console.log(recordset.length);
            for (var i = 0; i < recordset.length; i++) {
                data.push({
                    key: recordset[i].Score, 
                    y: recordset[i].Total
                });
            }   

            res.send(data);
        });

    });
});

console.log("Registering endpoint: /jsonendpoint");
app.get('/jsonendpoint', function(req, res){
    res.header("content-type: application/json");
    res.json({
        "mykey" : "myvalue",
        "testy" : "something",
        "exnum" : 123
    });
});

app.listen(3000);
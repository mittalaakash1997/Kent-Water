var mysql = require('mysql');
var conn = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'kent-water'
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("Mysql Connected");
});

module.exports = conn;
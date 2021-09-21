'use strict'
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : 'mysql-50168-0.cloudclusters.net',
  user     : 'admin',
  password : 'TEM2JKQv',
  port : 18972,
  database : 'products'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});
module.exports = dbConn;
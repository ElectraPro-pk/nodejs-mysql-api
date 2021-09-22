const express = require('express');
const dbConn = require('./db.config');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const About_App = "API CREATED BY <h2>ZEESHAN AKBAR</h2> <i>KHARKIV</i><br><b>EUROPE</b>"

// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 3000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
  res.send(About_App);
});


app.get('/items',(req,res) => {
    sql = "SELECT * FROM items ORDER BY serialNo"
    dbConn.query(sql,function(err,response){
        if(err){
             res.json({"status":503});
        }
        res.json({"data":response})
    })
})
app.get('/new-item/:id,:product,:category,:price',(req,res) => {
    
    sql = "INSERT INTO items VALUES('"+req.params.id+"','"+req.params.product+"','"+req.params.category+"','"+req.params.price+"')"
    dbConn.query(sql,function(err,response){
        if(err){
             res.json({"status":503});
        }
        res.json({"status":200});
    })
})
app.get('/search-item/:query',(req,res) => {
    sql = "SELECT * from items where product LIKE '%"+req.params.query.toLowerCase()+"%' or category LIKE '%"+req.params.query.toLowerCase()+"%' order by serialNo"
    dbConn.query(sql,function(err,response){
        if(err){
           res.json({"status":503});
        }
        res.json({"data":response})
    })
})
app.get('/delete-item/:id',(req,res) => {
    sql = "DELETE FROM items where serialNo = "+req.params.id
    dbConn.query(sql,function(err,response){
        if(err){
              res.json({"status":503});
        }
        res.json({"status":200});
    })
})
app.get('/update-item/:id,:product,:category,:price',(req,res) => {
    sql ="UPDATE items SET product = '"+req.params.product+"',category = '"+req.params.category+"', price = '"+req.params.price+"' where serialNo = '"+req.params.id+"'"
    dbConn.query(sql,function(err,response){
        if(err){
              res.json({"status":503});
        }
       res.json({"status":200});
    })
})


// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

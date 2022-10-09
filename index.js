const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mysql = require("mysql");

const port = 8080;

require("./routes/main")(app);

const db = mysql.createConnection({
  host: "localhost",
  //Change to your local user
  user: "root",
  //Change to your local password
  password: "your password",
  database: "employee_data"
});

// connect to database 
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

global.db = db;


app.set("views",__dirname+"/views");
app.set("view engine","ejs");
app.engine("html",require("ejs").renderFile);
app.listen(port,()=>console.log(`Example app listening on port ${port}!`));

app.use(bodyParser.json())
app.use('/stylesheet', express.static(__dirname + '/stylesheet'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/script', express.static(__dirname + '/script')); 


app.use('/filesaver', express.static(__dirname + '/node_modules/file-saver/dist/'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));

/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var path=require('path');

//Create Database Connection
var mysql = require('mysql');

/**********************
  Database Connection information
  host: This defines the ip address of the server hosting our database.  We'll be using localhost and run our database on our local machine (i.e. can't be access via the Internet)
  port: This defines what port we can expect to communicate to our database.  We'll use 5432 to talk with PostgreSQL
  database: This is the name of our specific database.  From our previous lab, we created the football_db database, which holds our football data tables
  user: This should be left as postgres, the default user account created when PostgreSQL was installed
  password: This the password for accessing the database.  You'll need to set a password USING THE PSQL TERMINAL THIS IS NOT A PASSWORD FOR POSTGRES USER ACCOUNT IN LINUX!
**********************/
var Connect =  mysql.createConnection({
	host: 'localhost',
	port: 3306,
	database: 'crispy_travel',
	user: 'Con',
	password: 'password'
});

Connect.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
  });
//

app.use(express.static(__dirname + '/'));

app.get('/', function(req,res)
{
  console.log("Got a GET request for the homepage");
  
  
  //res.sendFile(__dirname + '/views/Homepage.html'); 
});

app.listen(3000);
console.log('3000 is the magic port');

/***********************
  Load Components!

  Express      - A Node.js Framework
  Body-Parser  - A tool to help use parse the data in a post request
  Pg-Promise   - A database tool to help use connect to our PostgreSQL database
***********************/
var express = require('express'); //Ensure our express framework has been added
var app = express();
var Router = express.Router();
var bodyParser = require('body-parser'); //Ensure our body-parser tool has been added
var http = require('http');
var fs = require('fs');
app.use(bodyParser.json());              // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 app.use(bodyParser.urlencoded({
   extended: true
 }));
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
const db =  mysql.createConnection({
	host: 'localhost',
	port: 3306,
	database: 'crispy_travel',
	user: 'Con',
	password: 'password'
});


db.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
  });
//


app.use(express.static(__dirname));

//Login page 
app.get('/login', function(req, res) 
{
  console.log("Got a GET request for the Login Page");
  console.log(__dirname);
  res.sendFile(__dirname +'/views/Login.html');
});

//Registration page 
app.get('/register', function(req, res) 
{
  console.log("Got a GET request for the Registration page");
  console.log(__dirname);
  res.sendFile(__dirname +'/views/Register.html');
});

//Home Page
app.get('/home', function(req,res)
{
  console.log("Got a GET request for the homepage");
  console.log(__dirname);
  res.sendFile(__dirname +'/views/Homepage.html');
});
//Search Page
app.get('/search', function(req,res)
{
  console.log("Got a GET request for the searchpage");
  console.log(__dirname);
  res.sendFile(__dirname +'/views/parameters.html');

});

//Results Page

app.get('/results', function(req, res) 
{
  console.log("Got a GET request for the Results Page");
  console.log(__dirname);
  res.sendFile(__dirname +'/views/Results.html');
});


//	db.task('get-everything', task => {
  //return task.batch([task.any(insert_statement), task.any(color_select)
 // ]);

app.post('/login-submit', function(req,res)
{
  console.log("Got a POST request for the Login-submit page");
  var userEmail = req.body.email;
  var userPwd = req.body.password;
  console.log(userEmail,userPwd);

  var userChk = "select email, passwd from crispy_travel.users where '"+ userPwd +"' = passwd AND '"+ userEmail +"' = email;" 
  //console.log(userChk);

  db.query(userChk, function(err, rows, fields)
  {
    if(err) throw err;
    if(rows.length == 0)
    {
      console.log("invalid Login");
      fs.readFile(__dirname + '/views/Login.html', function(err,html)
      {
        if(err) throw err;
      })
      res.sendFile(__dirname +'/views/Login.html');
    }
    else
    {
      res.sendFile(__dirname +'/views/Homepage.html');
    }  
  })
})
 
app.post('/register', function(req,res)
{
  console.log("Got a POST request for the REGISTER page");
  var lastn = req.body.lastname;
  var firstn = req.body.firstname;
  var email = req.body.email;
  var phone = req.body.phone;
  var passwrd = req.body.pass;
  console.log(lastn);
  var useradd = "insert into users values ('"+lastn+"','"+firstn+"','"+email+"','"+phone+"','"+passwrd+"');";
  db.query(useradd, function(err,result){
    if(err) throw err;
    console.log("user added")
  })
  .then
  {
    res.sendFile(__dirname +'/views/Login.html')
  }
})

app.post('/search',function(req,res){
  console.log("Got a POST request from search page");
  var budget = req.body.budget;
  var climate = req.body.climate;
  var activity_level = req.body.activityLevel;
  var region = req.body.region;
  var activity = req.body.activity;
  console.log(budget);
  console.log(climate);
  console.log(activity_level);
  console.log(region);
  console.log(activity);
  var searchq = "select * from locations where region like '"+region+"' and activities like '%"+activity+"%';";
  db.query(searchq, function(err, result){
    if(err) throw err;
    console.log(result);
    console.log(result.length);
    var best = 10000;
    var best_index=0;
    for(var i=0;i<result.length;i++)
    {
      var cost_diff = Math.abs(result[i].cost - budget)*3;
      var climate_diff = Math.abs(result[i].cost - climate);
      var activity_diff = Math.abs(result[i].activity_level-activity_level)*2;
      var total_diff = cost_diff+climate_diff+activity_diff;
      if(total_diff<best){
        best_index = i;
      }
    }
    var best_dest = result[best_index];
    console.log(best_dest);


    /*
      IMPLEMENT RESULTS PAGE STUFF HERE
      DATA TO GO TO RESULTS PAGE IS STORED IN best_dest
      ARBITRARILY DECIDED TO WEIGHT COST BY A FACTOR OF 3, ACTIVITY BY A FACTOR OF 2, FEEL FREE TO CHANGE THIS


    */

    
  }).then
  {
    res.sendFile(__dirname+'/views/Results.html');
  }
})


app.listen(3000);
console.log('3000 is the magic port');

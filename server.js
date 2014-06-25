/*
 * server.js
 *
 * URL's are:
 * 1. GET  ->  /supervisor/:id
 * 2. GET  ->  /employees/:id
 * 3. PUT  ->  /supervisor/:id
 * 4. PUT  ->  /employees/:id
 * 5. PUT  ->  /login/
*/

var express = require("express"),
   methodOverride = require("method-override"),
   bodyParser = require("body-parser"),
   app = express(),
   MongoClient = require("mongodb").MongoClient,
   Server = require("mongodb").Server,
   ObjectID = require("mongodb").ObjectID;
   //ldap = require('ldapjs');

app.use(express.static(__dirname + '/app')); // Serve static files from the "app" subfolder.
app.use(methodOverride());                   // Allows use of "put" & "del" methods.
app.use(bodyParser());                       // This clears out rec.body.

// Connect to the local mongodb instance and use the timekeeping database.
var mongoclient = new MongoClient(new Server("localhost", 27017));
var db = mongoclient.db("timekeeping");

// Load dummy source data from files.
var company = require("./data/company.json");

/*
 * Get all employees under a supervisor (and their direct reports).
 */
app.get("/supervisor/:id", function (req, res) {
   db.collection("company").find({"manager.employeenumber":req.params.id}).toArray(function (err, doc) {
      if (err) {
         throw err;
      } else {
         res.send(doc);
      }
   });
});

/*
 * Get an employee.
 */
app.get("/employees/:id", function (req, res) {
   db.collection("company").findOne({"employeenumber" : req.params.id}, function (err, doc) {
      if (err) {
         throw err;
      } else {
         res.send(doc);
      }
   });
});

/*
 * Update an employee's review status.
 */
app.put("/employees/:id", function (req, res) {
   var company = req.body;
   company._id = new ObjectID(company._id);   // Convert _id to a mongo ObjectID

   db.collection("company").update({"_id" : company._id}, company, function (err, result) {
      if (err) {
         throw err;
      } else {
         db.collection("company").findOne({"_id" : company._id}, function (err, doc) {
            if (err) {
               throw err;
            } else {
               res.send(doc);
            }
         });
      }
   });
});

/*
 * Reset the database. This deletes all data and loads the sample / test data.
 */
app.get("/reinitialize", function (req, res) {
   db.collection("company").remove(function (err, removed) {
      if (err) {
         throw err;
      } else {
         console.dir("Successfully removed " + removed + " documents!");
         db.collection("company").insert(company, function (err, result) {
            if (err) {
               throw err;
            } else {
               console.dir("Successfully inserted: " + JSON.stringify(result.length) + " documents");
            }
         });
      }
   });
});

/*
 * Login verification.
 */
app.put("/login/", function (req, res) {
   var uid = req.body.username,
       pw = req.body.password;

   if (uid === "Mr. Slate" && pw === "12345") {
      res.send("Success");
   }
   else {
      res.send("Authentication Failed (404)", 404);
   }
});

/*
 * For any undefined routes, return a 404.
 */
app.get("*", function (req, res) {
   res.send("Page Not Found", 404);
});
app.post("*", function (req, res) {
   res.send("Page Not Found", 404);
});
app.put("*", function (req, res) {
   res.send("Page Not Found", 404);
});
app.del("*", function (req, res) {
   res.send("Page Not Found", 404);
});

/*
 * Fire up the server and start listening!
 */
mongoclient.open(function (err, mongoclient) {
   if (err) { 
      throw err; 
   }
   app.listen(3000, function () {
      console.dir("Express server started on port 3000.");
   });
});
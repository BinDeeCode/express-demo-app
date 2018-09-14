var express = require("express");
var bodyParser = require("body-parser");
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectId;
require("dotenv").config();
var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  process.env.DATABASE_URL,
  function(err, database) {
    if (err) {
      console.log(err);
    }

    // Create

    app.post("/notes", function(req, res) {
      const note = { text: req.body.text, title: req.body.title };
      database.collection("notes").insert(note, function(err, result) {
        if (err) {
          res.send({ error: "An error has occurred" });
        } else {
          res.send(result.ops[0]);
        }
      });
    });

    // Read
    // Home
    app.get("/", (req, res) => {
      res.send("Version 0.2 Notes API");
    });
    // All
    app.get("/notes", (req, res) => {
      database
        .collection("notes")
        .find({})
        .toArray(function(err, result) {
          res.send(result);
        });
    });
    //One
    app.get("/notes/:id", (req, res) => {
      const id = req.params.id;
      const details = { _id: new ObjectID(id) };
      database.collection("notes").findOne(details, (err, item) => {
        if (err) {
          res.send({ error: "An error has occurred" });
        } else {
          res.send(item);
        }
      });
    });

    // Update

    app.put("/notes/:id", (req, res) => {
      const id = req.params.id;
      const details = { _id: new ObjectID(id) };
      const note = { text: req.body.body, title: req.body.title };
      database.collection("notes").update(details, note, (err, result) => {
        if (err) {
          res.send({ error: "An error has occurred" });
        } else {
          res.send(note);
        }
      });
    });

    // Delete

    app.delete("/notes/:id", (req, res) => {
      const id = req.params.id;
      const details = { _id: new ObjectID(id) };
      database.collection("notes").remove(details, (err, item) => {
        if (err) {
          res.send({ error: "An error has occurred" });
        } else {
          res.send("Note " + id + " deleted!");
        }
      });
    });

    app.listen(port, function() {
      console.log("App listen on port " + port);
    });
  }
);

const express = require("express");
const assert = require("assert");
const router = express.Router();
const bodyParser = require("body-parser")
//const Users = require("../models/users");
const db = require('../db/mysql-connector')
//const jwt = require("../helpers/jwt");
const Appartments = require('../models/appartments')


// Get all users
router.get("/user", function(req, res, next){
      console.log("*")
    
    try{
        // Construct query object
        const query = {
        sql: "SELECT * FROM user",
        values: [],
        timeout: 2000
      };
  
      // Perform query
      db.query(query, (err, rows, fields) => {
        console.log("test2")

        if (err) {
          console.log(err);
          next(err);
        } else {
            res.status(200).json(rows);
        }
      });

    }catch{
        next(new Error("Get users went wrong"))
    }
})

// Get all appartements
router.get("/appartments", function(req, res, next){
    
    try{
        // Construct query object
        const query = {
        sql: "SELECT * FROM apartment",
        values: [],
        timeout: 2000
      };
  
      // Perform query
      db.query(query, (err, rows, fields) => {

        if (err) {
          console.log(err);
          next(err);
        } else {
            res.status(200).json(rows);
        }
      });

    }catch{
        next(new Error("Get appartments went wrong"))
    }
})

//
// Post new appartment
//
router.post("/appartments", function(req, res, next) {
  
  const appartment = new Appartments(req.body.description, req.body.streetaddress, req.body.postalcode, req.body.city, 1)
  console.log(appartment)
    try{
      console.log("2")
        // Construct query object
        const query = {
        sql: "INSERT INTO `apartment` (Description, StreetAddress, PostalCode, City, UserId) VALUES ('testjazz','test','test','test',1)",
        values: ["test", "test", "test", "test", 1],
        timeout: 2000
      };
  
      console.log("3")
      // Perform query
      db.query(query, (err, rows, fields) => {

        if (err) {
          console.log("Test")
          console.log(err);
          next(err);
        } else {
            res.status(200).json(rows);
        }
      });

    }catch{
        next(new Error("Creating an appartment went wrong"))
    }});

module.exports = router;

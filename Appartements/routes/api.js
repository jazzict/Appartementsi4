const express = require("express");
//const assert = require("assert");
const router = express.Router();
//const Users = require("../models/users");
const db = require('../db/mysql-connector')
//const jwt = require("../helpers/jwt");
const Appartments = require('../models/appartements')

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
        next(new Error("Gaat fout"))
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
        next(new Error("Gaat fout"))
    }
})

//
// Post new appartment
//
router.post("/appartments", function(req, res, next) {
  //const appartment = req.body || {};
  const appartment = new Appartment(req.body.description, req.body.streetaddress, req.body.postalcode, req.body.city, req.body.userid)

    try{
        // Construct query object
        const query = {
        sql: "INSERT INTO apartment (description, streetaddress, postalcode, city, userid) VALUES (?,?,?,?,?)",
        values: [appartment.description, appartement.streetaddress, appartement.postalcode, appartement.city, 1],
        timeout: 2000
      };
  
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
        next(new Error("Gaat fout"))
    }});

module.exports = router;

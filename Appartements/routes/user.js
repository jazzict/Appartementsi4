const express = require("express");
const assert = require("assert");
const router = express.Router();
const Users = require("../models/users");
//const jwt = require("../helpers/jwt");

const _users = new Users();
const saltRounds = 10;

// Get all users
router.get("/user", function(req, res, next){
    try{
        // Construct query object
        const query = {
        sql: "SELECT * FROM users",
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
        console.log("CATCH")
    }
})

module.exports = router;

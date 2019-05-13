const express = require("express");
const assert = require("assert");
const router = express.Router();
const Users = require("../models/users");
const jwt = require("../helpers/jwt");

const _users = new Users();
const saltRounds = 10;

// Get all users
router.get("/users", function(req, res, next){
    _users.readAll((err, result) => {
        if (err) {
          res.status(500).json(err.toString());
        } else {
          res.status(200).json(result);
        }
      });
})

module.exports = router;

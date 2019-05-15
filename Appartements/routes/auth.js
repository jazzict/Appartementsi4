const express = require("express");
const assert = require("assert");
const router = express.Router();
const User = require("../models/users");
const db = require("../db/mysql-connector");
const bcrypt = require("bcryptjs");
const jwt = require("../helpers/jwt");

const saltRounds = 10;

//Endpoint for all endpoints
// router.all("*", function(req, res, next) {
    
//     const token = req.header("token");
//     console.log("decode");
//     tokendata = token;
  
//     jwt.decodeToken(token, (err, payload) => {
//       console.log(token)
//       if (err) {
//         console.log("Error handler: " + err.message);
//         res.status(401);
//         res.json({
//           error: err.message
//         });
//       } else {
//           tokenUserId = payload.userId;
//           console.log(payload);
//           next();
//       }
//     });
//   //  console.log("Function decode end");
//   });

//
// Register new user
//
router.post("/register", function(req, res, next) {
  try {
      console.log(req.body.emailaddress)
    // Validate with assert is string etc ..
    assert(typeof req.body.emailaddress === "string", "Email is not a string!");
    assert(typeof req.body.password === "string", "Password is not a string!");
    assert(typeof req.body.firstname === "string", "firstname is not a string!");
    assert(typeof req.body.lastname === "string", "lastname is not a string!");
    assert(typeof req.body.streetaddress === "string", "streetaddress is not a string!");
    assert(typeof req.body.postalcode === "string", "postalcode is not a string!");
    assert(typeof req.body.city === "string", "city is not a string!");
    assert(typeof req.body.dataofbirth === "string", "dataofbirth is not a string!");
    assert(typeof req.body.phonenumber === "string", "phonenumber is not a string!");

    // Create new user object, hash password (do not store in db).
    // Throws err if no valid object can be constructed
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    const user = new User(req.body.emailaddress, hash, req.body.firstname, req.body.lastname, req.body.streetaddress, req.body.postalcode, req.body.city, req.body.phonenumber, req.body.dataofbirth);

    // Construct query object
    const query = {
      sql: "INSERT INTO `user`(emailaddress, password, firstname, lastname, streetaddress, postalcode, city, phonenumber, dataofbirth) VALUES (?,?,?,?,?,?,?,?,?)",
      values: [user.email, hash, user.firstname, user.lastname, user.streetaddress, user.postalcode, user.city, user.phonenumber, user.dataofbirth],
      timeout: 2000
    };

    // Perform query
    db.query(query, (err, rows, fields) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json(rows);
      }
    });
  } catch (ex) {
    next(ex);
  }
});

//
// Login with username / password
//
router.post("/login", function(req, res, next) {
  try {
    // Validate with assert is string etc ..
    assert(typeof req.body.password === "string", "Password is not a string!");
    assert(typeof req.body.firstname === "string", "Firstname is not a string!");

    // Construct query object
    const query = {
      sql: "SELECT `password` FROM `user` WHERE `firstname`=?",
      values: [req.body.firstname],
      timeout: 2000
    };

    // Perform query
    db.query(query, (err, rows, fields) => {
      if (err) {
        next(err);
      } else {
        if (
          rows.length === 1 &&
          bcrypt.compareSync(req.body.password, rows[0].password)
        ) {
          token = jwt.encodeToken(req.body.username);
          res.status(200).json({ token: token });
        } else {
          next(new Error("Invalid login, bye"));
        }
      }
    });
  } catch (ex) {
    next(ex);
  }
});

// Fall back, display some info
router.all("*", function(req, res, next) {
  next(new Error("Unknown endpoint"));
});

module.exports = router;

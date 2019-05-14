const config = require("./config/config.json");
const express = require("express");
const bodyParser = require("body-parser");
//const apiv1 = require("./routes/apiv1");
const user = require("./routes/user");
//const auth = require("./routes/auth");
// const logger = require("tracer").dailyfile({
//   root: "./logs",
//   maxLogFiles: 10,
//   allLogsFileName: "movies",
//   format: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})",
//   dateformat: "HH:MM:ss.L"
// });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middelware, logging voor alle request
app.all("*", function(req, res, next) {
  logger.info("%s", req.hostname);
  next();
});

// Routing without JWT
//app.use("/auth", auth);

// Routing protected by JWT
//app.use("/apiv1", apiv1);
app.use("/user", user);

// Optional log error
function errorLoggerHandler(err, req, res, next) {
  logger.error("%s", err.message);
  next(err);
}

// Set default error handler
function errorResponseHandler(err, req, res, next) {
  res.status(500);
  res.json({ mgs: "Go, you hacker!" });
}

// Register the error handlers
app.use(errorLoggerHandler);
app.use(errorResponseHandler);

// ECMA 6
const port = process.env.PORT || config.local.port;
const server = app.listen(port, () => {
  console.log(
    "The app is now running at server adress:  " + server.address().port
  );
});

module.exports = app;

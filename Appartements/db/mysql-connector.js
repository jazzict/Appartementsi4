const mysql = require("mysql");
const config = require("../config/config.json");
const logger = require("tracer").colorConsole();

const reconnectTimeout = 2000; // ms.

const connectionSettings = {
  connectionLimit: 20,
  host: process.env.DB_HOST || config.local.dbServer,
  user: process.env.DB_USER || config.local.dbUsername,
  password: process.env.DB_PASSWORD || config.local.dbPassword,
  database: process.env.DB_DATABASE || config.local.dbSchema,
  port: 3306,
  debug: false
};

var pool;

// http://sudoall.com/node-js-handling-mysql-disconnects/
// function handleDisconnect() {
pool = mysql.createPool(connectionSettings);

pool.on("acquire", connection => {
  logger.trace("Connection %d acquired", connection.threadId);
});

pool.on("connection", connection => {
  logger.trace("Connection to database was made");
});

pool.on("enqueue", () => {
  logger.trace("Waiting for available connection slot");
});

pool.on("release", connection => {
  logger.trace("Connection %d released", connection.threadId);
});

module.exports = pool;
 
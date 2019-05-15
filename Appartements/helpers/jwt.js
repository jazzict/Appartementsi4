const settings = require("../config/config.json");
const moment = require("moment");
const jwt = require("jwt-simple");

//
// Encode (van username naar token)
//
function encodeToken(userId) {
  const playload = {
    exp: moment()
      .add(5, "days")
      .unix(),
    iat: moment().unix(),
    userId: userId
  };
  return jwt.encode(playload, config.dbconfig.key);
}

//
// Decode (van token naar email)
//
function decodeToken(token, cb) {
  try {
    const payload = jwt.decode(token, config.dbconfig.key);
    
    // Check if the token has expired
    if (moment().unix() > payload.exp) {
      cb(new Error("token_has_expired"));
    } else {
    console.log("token has not expired.");
    console.log(payload);
      cb(null, payload);
     //cb(payload, null);
    }
  } catch (err) {
    cb(err, null);
  }
}

module.exports = {
  encodeToken,
  decodeToken
};

class Users {

    constructor(){
        this._db = []
    }

    // Find all users
    readAll(cb) {
        cb(null, this._db);
    }
}
module.exports = Users
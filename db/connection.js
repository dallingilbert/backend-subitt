const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

let _db;

const initDb = (cb) => {
  if (_db) {
    console.log("Db is already initialized!");
    return cb(null, _db);
  }

  MongoClient.connect(process.env.MONGO_DB)
    .then((client) => {
      _db = client;
      cb(null, _db);
    })
    .catch((err) => {
      cb(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Db not initialized");
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};

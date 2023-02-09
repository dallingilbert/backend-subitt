const { ObjectId } = require("bson");
const mongodb = require("../db/connection");

const getUsers = async (req, res) => {
  console.log("Getting users");
  const result = await mongodb
    .getDb()
    .db("userExample")
    .collection("users")
    .find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getUserById = async (req, res) => {
  const id = new ObjectId(req.params.id);
  console.log("Getting user by ID");
  const result = await mongodb
    .getDb()
    .db("userExample")
    .collection("users")
    .find({ _id: id });
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

module.exports = { getUsers, getUserById };

const { ObjectId } = require("bson");
const Api404Error = require("../api404Error");
const BaseError = require("../baseError");
const mongodb = require("../db/connection");

/* Returns a list of users */
const getUsers = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db("userExample")
      .collection("users")
      .find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    console.log(error);
  }
};

/* Returns a user by their ID */
const getUserId = async (req, res, next) => {
  const id = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .db("userExample")
      .collection("users")
      .find({ _id: id });

    result.toArray().then((users) => {
      if (users.length <= 0) {
        throw new Api404Error(`User with id: ${id} not found`);
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users);
    });
  } catch (error) {
    console.log(error);
  }
};

/** Adds a user to the database */
const addUser = async (req, res) => {
  try {
    const result = await mongodb.getDb().db("userExample").collection("users");
    const findUser = await mongodb
      .getDb()
      .db("userExample")
      .collection("users")
      .find({ user: req.body.user });

    result.insertOne(req.body).then((newUser) => {
      console.log(req.body.user);
      findUser.toArray().then((user) => {
        if (user[0].user === req.body.user) {
          console.log(user);
          throw new BaseError(
            "Duplicate User",
            500,
            false,
            "Cannot add user with same name"
          );
        }
      });
      res.setHeader("Content-Type", "application/json");
      res.status(201).json(newUser);
    });
  } catch (error) {
    console.log(error);
  }
};

/** Updates a user */
const updateUser = async (req, res) => {
  const id = new ObjectId(req.params.id);

  const user = {
    user: req.body.user,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    numFriends: req.body.numFriends,
    friendsList: req.body.friendsList,
  };

  try {
    const response = await mongodb
      .getDb()
      .db("userExample")
      .collection("users")
      .replaceOne({ _id: id }, user);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(response.error || "Some error occured while updating the user");
    }
  } catch (error) {
    console.log(error);
  }
};

/** Deletes a user from the database */
const deleteUser = async (req, res) => {
  const id = new ObjectId(req.params.id);

  try {
    const result = await mongodb.getDb().db("userExample").collection("users");

    result.deleteOne({ _id: id }).then((user) => {
      res.status(200).json(user);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUsers, getUserId, addUser, updateUser, deleteUser };

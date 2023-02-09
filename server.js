const express = require("express");
const app = express();
const cors = require("cors");
const mongodb = require("./db/connection");
const bodyParser = require("body-parser");
const PORT = 3000;

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cors())
  .use("/", require("./routes"));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () =>
      console.log(`Connected to DB and running on port: ${PORT}`)
    );
  }
});

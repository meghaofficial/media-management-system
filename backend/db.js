const mongoose = require("mongoose");
require("dotenv").config();
const mongo_url = process.env.MONGODB_URI;

mongoose
  .connect(mongo_url)
  .then(() => console.log("Connected to db successfully"))
  .catch((err) => console.log("Error connected in mongodb - >>>>>>", err));

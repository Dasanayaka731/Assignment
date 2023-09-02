const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

//creating a model named "User" using the Mongoose library and the "userSchema" variable
const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const validator = require("validator");

const Users = mongoose.model("Users", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("The entered email is not valid!");
      }
    },
    trim: true,
    lowercase: true,
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be positive");
      }
    },
    default: 0,
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error(
          "The passsword should not contain the password keyword"
        );
      }
    },
  },
});

module.exports = Users;

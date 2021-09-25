const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");
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

// const me = new Users({
//   name: "       Sheharyar       ",
//   email: "   SHEHARYARISHFAQ@GMAIL.COM",
//   password: "PASSWORD2323S",
// });

// me.save()
//   .then(() => console.log(me))
//   .catch((error) => console.log(error));

const Tasks = mongoose.model("Tasks", {
  description: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const task1 = new Tasks({
  description: "           Learn Nodejs from udemy              ",
  // completed: true,
});

task1
  .save()
  .then(() => console.log(task1))
  .catch((error) => console.log(error));

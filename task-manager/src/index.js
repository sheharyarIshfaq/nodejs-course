const express = require("express");
require("./db/mongoose");
const Users = require("./models/user");
const Tasks = require("./models/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/users", (req, res) => {
  const user = new Users(req.body);

  user
    .save()
    .then(() => res.status(201).send(user))
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.get("/users", (req, res) => {
  Users.find({})
    .then((users) => res.send(users))
    .catch((error) => res.status(500).send());
});

app.get("/users/:id", (req, res) => {
  const _id = req.params.id;

  Users.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }

      res.send(user);
    })
    .catch((error) => {
      res.status(500).send();
    });
});

app.post("/tasks", (req, res) => {
  const task = new Tasks(req.body);

  task
    .save()
    .then(() => res.status(201).send(task))
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.get("/tasks", (req, res) => {
  Tasks.find({})
    .then((tasks) => res.send(tasks))
    .catch((error) => res.status(500).send());
});

app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Tasks.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send();
      }

      res.send(task);
    })
    .catch((error) => res.status(500).send());
});

app.listen(port, () => {
  console.log(`Server is listening on post ${port}`);
});

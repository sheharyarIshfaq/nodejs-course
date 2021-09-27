const express = require("express");
const Users = require("../models/user");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/users", async (req, res) => {
  const user = new Users(req.body);
  try {
    await user.save();
    const token = await user.getAuthenticationToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await Users.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.getAuthenticationToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await Users.findById(_id);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const updatesAllowed = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    updatesAllowed.includes(update)
  );

  if (!isValidOperation) {
    return res.status(404).send({ error: "Invalid Updates!" });
  }

  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    if (!user) {
      return res.send(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

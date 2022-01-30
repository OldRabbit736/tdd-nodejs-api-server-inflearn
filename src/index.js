const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");

let users = [
  { id: 1, name: "alice" },
  { id: 2, name: "bek" },
  { id: 3, name: "chris" },
];

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/users", function (req, res, next) {
  req.query.limit = req.query.limit || 10;
  const limit = parseInt(req.query.limit, 10);
  Number.isNaN(limit) ? res.status(400).end() : res.json(users.slice(0, limit));
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  console.log({ user });
  res.json(user);
});

app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  users = users.filter((user) => user.id !== id);
  res.status(204).end();
});

app.post("/users", (req, res) => {
  const name = req.body.name;
  const id = Date.now();
  const user = { name, id };
  users.push(user);
  res.status(201).json(user);
});

app.listen(3000, () => {
  console.log("RUNNING ON PORT 3000");
});

module.exports = app;

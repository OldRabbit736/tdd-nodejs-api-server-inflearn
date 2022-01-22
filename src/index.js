const express = require("express");
const app = express();
const morgan = require("morgan");

const users = [
  { id: 1, name: "alice" },
  { id: 2, name: "bek" },
  { id: 3, name: "chris" },
];

app.use(morgan("dev"));

app.get("/users", function (req, res, next) {
  res.json(users);
});

app.listen(3000, () => {
  console.log("RUNNING ON PORT 3000");
});
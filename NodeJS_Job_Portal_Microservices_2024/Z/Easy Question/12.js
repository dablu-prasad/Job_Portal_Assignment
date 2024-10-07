const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hi from an Express app");
});

app.get("/test", (req, res) => {
  res.send("<h1>this is a test</h1>");
});

app.get("/user", (req, res) => {
  console.log(req.query.id);
  res.send("this is a user route");
});

app.get("/account/:number", (req, res) => {
  let numb = +req.params.number;
  if (isNaN(numb)) {
    return res.send("server only accepts numbers");
  }
  res.send("number sent")
});

app.listen(port, () => {
  console.log("Server is running");
});

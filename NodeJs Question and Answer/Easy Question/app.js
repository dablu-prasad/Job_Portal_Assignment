const express = require("express");
const app = express();
const port = 5000;
const ejs = require("ejs");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



app.get("/user/:user_name", (req, res) => {
  res.send("This is backend");
});

app.get("/*", (req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log("Server is running");
});

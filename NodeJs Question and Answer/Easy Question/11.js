const express = require("express");
const app = express();
const port = 5000;
const ejs = require("ejs");
const path = require("path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/user/:user_name", (req, res) => {
  res.send("This is backend");
  // res.render("index",{username:req.params.user_name})
});

app.listen(port, () => {
  console.log("Server is running");
});

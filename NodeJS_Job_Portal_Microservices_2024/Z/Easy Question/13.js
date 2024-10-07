const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hi from an Express app");
});

app.listen(port, () => {
  console.log("Server is running");
});

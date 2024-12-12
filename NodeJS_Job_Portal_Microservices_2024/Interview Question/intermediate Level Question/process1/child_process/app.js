const app = require("express")();
const { fork } = require("child_process");

app.get("/heavy", (req, res) => {
  //spawn a new Node.js process/instance
  var child = fork(__dirname + "/count.js");
  //once the child operation is finished send the data to user
  child.on("message", (myCount) => {
    console.log("Sending /heavy result");
    res.send(myCount);
  });
  //send message to the child signaling that it needs to start the heavy operration
  child.send("START_COUNT");
});

app.get("/light", (req, res) => {
  res.send("Hello from light ");
});

app.listen(5000, () => console.log("Server running on port: 5000"));

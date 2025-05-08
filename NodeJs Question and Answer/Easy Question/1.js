require("./db");
console.log("From 1.js");

function showMessage(message) {
  console.log(message);
}

module.exports = showMessage;

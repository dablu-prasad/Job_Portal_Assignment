const DB = require("./Db");

console.log("User is running");
console.log(DB.orders);
DB.addOrder({ item: "chicken-menu" });
console.log(DB.orders);
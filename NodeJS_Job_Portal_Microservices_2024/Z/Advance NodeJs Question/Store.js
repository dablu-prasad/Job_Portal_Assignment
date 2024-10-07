const DB = require("./Db");

console.log("Store is running");
console.log(DB.orders);
DB.users = ["Adam", "john"];
console.log(DB.users);

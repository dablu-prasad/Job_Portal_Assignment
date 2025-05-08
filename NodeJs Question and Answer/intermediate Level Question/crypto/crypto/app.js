const crypto = require("crypto");  //Crypto is a module in Node. js which deals with an algorithm that performs data encryption and decryption.
const execTime = require("execution-time")();

function callCrypto() {
  execTime.start();
  crypto.pbkdf2("someSecret", "salt", 500000, 512, "sha512", (err, key) => {
    console.log(key);
    console.log(execTime.stop());
    console.log("-------------------");
  });
}

callCrypto();
callCrypto();
callCrypto();
callCrypto();
callCrypto();
callCrypto();

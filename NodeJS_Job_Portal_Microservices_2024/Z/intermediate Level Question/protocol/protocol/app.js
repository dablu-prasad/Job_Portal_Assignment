const port = process.argv[2];
const addr = process.argv[3];

const dgram = require("dgram");
const server = dgram.createSocket("udp4");

var client_data = [];

server.on("error", (err) => {
  console.log(`server error ${err.stack}`);
  server.close();
});

//this event is fired when we get data from the client
server.on("message", (msg, info) => {
  console.log(msg.toString().trim());
  client_data.push({ port: info.port, address: info.address });
});

server.on("listening", () => {
  const address = server.address();
  console.log(`server listening ${address.address}, ${address.port}`);
});

//causes dgram.Socket to listen for datagram messages on a named port
server.bind(port, addr);

//the process object provides information about the current Node.js process and process object is an instance of EventEmitter
//stdin.io listens for the user input,every time we enter input,this event runs,it is listening for a "data" event which is fired when a user hits enter.
process.stdin.on("data", (d) => {
  if (d.toString().trim() == "exit") {
    return process.exit();
  }

  if (client_data.length != 0) {
    client_data.forEach((client) => {
      server.send(d, client.port, client.address, (err) => {
        if (err) {
          console.log(err);
          throw err;
        }

        if (client_data.length > 0) {
          client_data.shift();
        }
      });
    });
  }
});

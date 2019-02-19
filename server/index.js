// using the http module
let http = require("http");
var webSocketServer = require("websocket").server;
let port = process.env.PORT || process.argv[2] || 8080;

//properties in rooms should look like the following:
//roomName : { clientCount:#, clients:[]}
let rooms = {};

// create a simple server
let server = http.createServer(function(req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("I hope this works");
  res.end();
});

// listen on the port
server.listen(port, function() {
  console.log("app up on port: " + port);
});

var wsServer = new webSocketServer({
  httpServer: server
});

function htmlEntities(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function handleMessage(data) {
  console.log("Received messsage from room: " + data.room);

  let reconstructedMessage = {
    type: "message",
    username: data.username,
    room: data.room,
    text: data.text
  };

  let json = JSON.stringify(reconstructedMessage);

  for (var i = 0; i < rooms[data.room].clients.length; i++) {
    rooms[data.room].clients[i].sendUTF(json);
  }
  console.log("sent " + json);
}

function handleSubscribe(data, connection) {
  if (!rooms[data.room]) {
    rooms[data.room] = { clientCount: 0, clients: [] };
  }

  rooms[data.room].clientCount++;
  rooms[data.room].clients.push(connection);

  console.log("New subscription: " + Object.keys(rooms));
}

wsServer.on("request", function(request) {
  console.log(new Date() + " Connection from origin " + request.origin + ".");

  var connection = request.accept(null, request.origin);

  //rooms.default.push(connection);

  connection.on("message", function(message) {
    if (message.type === "utf8") {
      console.log(message);
      // log and broadcast the message
      console.log(new Date() + " Received Message: " + message.utf8Data);

      let data = JSON.parse(message.utf8Data);

      switch (data.type) {
        case "message":
          handleMessage(data);
          break;
        case "subscribe":
          console.log(data.username + " subscribing to " + data.room);
          handleSubscribe(data, connection);
          break;
      }
    }
  });

  connection.on("close", function(connection) {
    // remove user from the list of connected clients

    Object.keys(obj).forEach(function(key, index) {
      // key: the name of the object key
      // index: the ordinal position of the key within the object

      let connectionIndex = obj.key.clients.indexOf(connection);

      if (connectionIndex > -1) {
        obj.key.clients.splice(connectionIndex, 1);
        obj.key.clientCount--;

        if (obj.key.clientCount === 0) {
          delete obj.key;
        }
      }
    });
  });
});

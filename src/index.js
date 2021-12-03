const { server, app } = require("./server");

server.listen(app.get("port"), () => {
  console.log("Server is running on port: ", app.get("port"));
});

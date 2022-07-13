const productController = require("../controllers/products");
const chatController = require("../controllers/chat");
const testProductos = require("../controllers/testProductos");

module.exports = socketConfig = (io) =>{

  io.on("connection", (socket) => {
    console.log("un nuevo usuario conectado");
  
    testProductos.getProducts().then((data) => {
      socket.emit("test", data);
    });
  
    productController.getAll().then((data) => {
      socket.emit("msg", data);
    });
  
    chatController.getChat().then((data) => {
      io.sockets.emit("newchat", data);
    });
  
    socket.on("message", (data) => {
      productController.save(data);
    });
  
    socket.on("new-message", (data) => {
      chatController.newMsg(data);
      chatController.getChat().then((data) => {
        io.sockets.emit("newchat", data);
      });
    });
  })
}


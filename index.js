require("dotenv").config();

const initMongoDB = require("./src/services/mongodb");    // Configuración de mongoDB 
const socketConfig = require("./src/services/websocket"); // Configuración de socket.io
const server = require("./src/app");                    // Configuración del servidor express.js
const io = require("socket.io")(server);  
const logger = require('./src/services/logger');


const cluster = require('cluster')
const os = require("os"); 
const minimist = require('minimist');

const optiones = { default: {puerto:8080 , modo:'FORK'}};
const argv = minimist(process.argv.slice(2),optiones);

port = process.env.PORT || argv.puerto 

socketConfig(io);

initMongoDB();

const init = () => {

  const numCPUs = os.cpus().length;
  if (argv.modo === "CLUSTER" && cluster.isPrimary) {
    logger.info(`CORRIENDO MASTER PROCESS ID ${process.pid}`);    
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      looger.info(`WORKER ${worker.process.pid} finalizó`);
    });
  } else {
    server.listen( port , () => {
      logger.info(`CORRIENDO WORKER PROCESS ID ${process.pid}`);
    });
  }
};

init();
const { ChatModel } = require("../models/chat");
const logger = require('../services/logger')
const { normalize, schema, denormalize } = require("normalizr");

class Contenedor {
  getChat = async () => {
    try {
      const data = await ChatModel.find().lean();
      const author = new schema.Entity("authors", {}, { idAttribute: "mail" });
      const msg = new schema.Entity(
        "messages",
        {
          author: author,
        },
        { idAttribute: "_id" }
      );
      const msgsSchema = new schema.Array(msg);
      const normalizedData = normalize(data, msgsSchema);
      return normalizedData;
    } catch (err) {
      logger.error("Error de lectura", err.message);

    }
  };

  newMsg = async (data) => {
    try {
      await ChatModel.create(data);
    } catch (err) {
      logger.error(err.message);
    }
  };
}

const chatController = new Contenedor();

module.exports = chatController;

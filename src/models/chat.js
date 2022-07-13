const { Schema, model } = require("mongoose");

const ChatSchema = new Schema({
  author: {
    mail: { type: String, required: true, max: 50 },
    nombre: { type: String, required: true, max: 50 },
    apellido: { type: String, required: true, max: 50 },
    edad: { type: Number, required: true },
    alias: { type: String, required: true, max: 50 },
    avatar: { type: String, required: true },
  },
  text: { type: String, required: true },
});

const ChatModel = model("chat", ChatSchema);

module.exports = { ChatModel };

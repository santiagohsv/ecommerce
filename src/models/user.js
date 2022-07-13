const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  mail: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nombre: { type: String},
  edad: { type: Number },
  direccion: { type: String },
  telefono: { type: String },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, 10);
  this.password = hash;
  next();
});

const UserModel = model("user", UserSchema);

module.exports = { UserModel };

const twilio = require('twilio')
const logger = require('./logger');
const client = new twilio(process.env.TWILIO_ACCOUNT_ID,process.env.TWILIO_TOKEN );

const newCartWpp = (mail, nombre) => {
  client.messages
    .create({
      from: `whatsapp:${process.env.TWILIO_CELLPHONE}`,
      body: `Nuevo pedido de ${nombre} <${mail}>`,
      to: `whatsapp:${process.env.ADMIN_PHONE}`,
    })
    .then((message) => logger.info(message.sid));
};

module.exports = newCartWpp;
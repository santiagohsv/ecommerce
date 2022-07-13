const nodemailer = require ('nodemailer');
const logger = require('./logger');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  
  transporter.verify(function (error, success) {
    if (error) {
      logger.error(err.message);
    } else {
      logger.info("Server is ready to take our messages");
    }
  });

  
  const newUserMail = (mail, nombre) => {
    transporter.sendMail(
      {
        from: "santiago",
        to: process.env.GMAIL_ACCOUNT,
        subject: "Nuevo usuario",
        html: `<h2>Nuevo usuario registrado</h2>
              <p>Nombre: ${nombre}</p>  
              <p>mail: ${mail}</p>      
      `,
      },
      (err, info) => {
        if (err) {
          logger.error(err.message);
        }
      }
    );
  };
  

  const newCartMail = (mail, nombre, products) => {

    transporter.sendMail(
      {
        from: "santiago",
        to: process.env.GMAIL_ACCOUNT,
        subject: `Nuevo pedido de ${nombre} <${mail}>`,
        html: `<h2>Pedido #111</h2>
         <div>${products}</div>
      `,
      },
      (err, info) => {
        if (err) {
          logger.error(err.message);
        }
      }
    );
  };
  
module.exports = {newUserMail, newCartMail};
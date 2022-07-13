const MongoStore = require('connect-mongo');

sessionConfig = {
    store: MongoStore.create({mongoUrl: process.env.BD}),
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 180*1000
    }
  }; 

module.exports = sessionConfig 
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { UserModel } = require('../models/user'); 
const bcrypt = require('bcrypt');
const {newUserMail} = require('./mail');

const strategyOptions = {
  usernameField: "mail",
  passwordField: "password",
  passReqToCallback: true,
};

const login = async (req, mail, password, done) => {
  const user = await UserModel.findOne({ mail });
  if (!user) return done(null, false);
  const validatePassword = bcrypt.compareSync(password, user.password);
  if (!validatePassword) return done(null, false);
  return done(null, user);
};

const signup = async (req, mail, password, done) => {
  const { nombre, edad, direccion, telefono} = req.body;
  try {
    const newUser = await UserModel.create({ mail, password, nombre, edad, direccion, telefono });
    newUserMail(mail,nombre)
    return done(null, newUser);
  } catch (err) {
    console.log(err.message);
    return done(null, false);
  }
};

const loginFnc = new LocalStrategy(strategyOptions, login);
const signupFnc = new LocalStrategy(strategyOptions, signup);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = { loginFnc, signupFnc };

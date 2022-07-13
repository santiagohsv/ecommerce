const express = require('express');
const path = require('path');
const viewPath = path.resolve(__dirname, "../views");
const sessionConfig = require('./services/sessions');  
const session = require('express-session');
const passport = require('passport'); 
const mainRouter = require('./routes/index');
const { loginFnc , signupFnc} = require('./services/auth');   
const app = express();
const server = require("http").Server(app);
const authMiddleware = require('./middlewares/auth')

app.use(express.static(path.resolve(__dirname, "../public"))); 
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use('login', loginFnc);
passport.use('signup', signupFnc);

app.set("view engine", "pug");
app.set("views", viewPath);

app.get("/",authMiddleware(), (req, res) => {
     res.render('index', {user: req.session.passport.user.mail}) 
});

app.use("/api", mainRouter);

module.exports = server;
const express = require("express");
const router = express.Router();
const passport = require("passport");
const logger = require('../services/logger');
/* const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/files')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })
 */

router.get("/login", (req, res) => {
  req.isAuthenticated() ? res.redirect("/") : res.render("login");
});

router.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/api/auth/loginfail" }), 
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/signup", (req, res) => {
  res.render("signup");
});


router.post("/signup", passport.authenticate("signup", { failureRedirect: "/api/auth/signupfail" }), (req, res) => {
    res.redirect("/api/auth/login");
  }
); 

/* router.post("/signup", passport.authenticate("signup", { failureRedirect: "/api/auth/signupfail" }), upload.file('foto'), (req, res) => {
  res.redirect("/api/auth/login");
}
); 
 */
router.get("/logout", (req, res) => { 
  const session = req.session;
  session.destroy((err) => {
    if (err) {
      logger.error(err.message);
      return;
    }
    return res.redirect("/api/auth/login");
  });
});

// ERRORES

router.get("/loginfail", (req, res) => {
  res.render("login-error");
});

router.get("/signupfail", (req, res) => {
  res.render("signup-error");
});

module.exports = router;

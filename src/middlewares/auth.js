function authMiddleware() {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/api/auth/login')
  };
}

module.exports = authMiddleware



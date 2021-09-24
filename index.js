const jwt = require('jsonwebtoken');

const JWTVerify = (JWTSecret) => {
  return (verifyMiddleware = (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (token) {
        if (jwt.verify(token, JWTSecret)) {
          res.locals.isUserLoggedIn = true;
          res.locals.tokenValues = jwt.decode(token);
        } else {
          res.locals.isUserLoggedIn = false;
        }
      }
    } catch (err) {
      res.locals.isUserLoggedIn = false;
      next();
    }
    next();
  });
};

module.exports = JWTVerify;

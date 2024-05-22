const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const { getUserById } = require('../db');




async function token(req, res, next) {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    if (!auth) {
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      try {
        const { id } = jwt.verify(token, JWT_SECRET);
        if (id) {
          req.user = await getUserById(id);
          console.log('getUserById at auth', req.user)
          next();
        }
      } catch ({ name, message }) {
        next({ name, message });
      }
    } else {
      next({
        name: 'AuthorizationHeaderError',
        message: `Authorization token must start with ${ prefix }`
      });
    }
  };

module.exports = {
    token
};
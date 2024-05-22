const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const app = require('../app');
  
//==========================Server Health===========================================
// GET /api/health
apiRouter.get('/health', async (req, res, next) => {
  res.send(
    { message: "Server Online" }
  );
});


//=======================Routes==============================================
apiRouter.use('/users', require('./users'));
apiRouter.use('/posts', require('./posts'));
apiRouter.use('/comments', require('./comments'));


module.exports = apiRouter;
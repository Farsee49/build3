const express = require('express');
const commentsRouter = express.Router();
const catchAsync = require('../utils/catchAsync');
const { token } = require('../utils/auth');
const { createComment, getPostsByUser, getPostById, getAllComments } = require('../db');

commentsRouter.get('/all', catchAsync(async (req, res, next) => {
    const comments = await getAllComments();
    res.send({
        name: 'Success Getting All Comments',
        message: 'Comments Retrieved!!!',
        comments,
        success: true,
    });
}));


module.exports = commentsRouter;
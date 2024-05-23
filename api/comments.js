const express = require('express');
const commentsRouter = express.Router();
const catchAsync = require('../utils/catchAsync');
const { token } = require('../utils/auth');
const {
    getCommentsByPostId,
    getAllComments,
    updateComment,
    getCommentById
        } = require('../db');

commentsRouter.get('/all', catchAsync(async (req, res, next) => {
    const comments = await getAllComments();
    res.send({
        name: 'Success Getting All Comments',
        message: 'Comments Retrieved!!!',
        comments,
        success: true,
    });
}));

commentsRouter.get('/:postId', catchAsync(async (req, res, next) => {
    const postId = req.params.postId;
    const comments = await getCommentsByPostId(postId);
    res.send({
        name: 'Success Getting Comments By Post Id',
        message: 'Comments Retrieved!!!',
        comments,
        success: true,
    });
}));


commentsRouter.patch('/:commentId', token, catchAsync(async (req, res, next) => {
    const { commentId } = req.params;
    req.body.authorId = req.user.id;
    const updatedComment = await getCommentById(commentId);
    req.body.postId = updatedComment.postId;
    if ( !updatedComment ) {
        res.send({
            name: 'Error Updating Comment',
            message: 'Comment not found',
            success: false,
        });
    } else if ( req.user.id !== updatedComment.authorId ) {
        res.send({
            name: 'Error Updating Comment',
            message: 'You are not the author of this comment',
            success: false,
        });
    } else {
    const { postId, authorId, title, body } = req.body;
    const fields= req.body;
    const comment = await updateComment(commentId, fields);
        res.send({
            name: 'Success Creating Comment',
            message: 'Comment Created!!!',
            comment,
            success: true,
    });
    }
}));


module.exports = commentsRouter;
const express = require('express');
const postsRouter = express.Router();
const catchAsync = require('../utils/catchAsync');
const { token } = require('../utils/auth');

const {
    createPost,
    getAllPosts,
    getPostById,
    getPostsByUser,
    updatePost,
    deletePost,
    getUserById,
    createComment
} = require('../db');



const UnauthorizedError = () => 'You are not authorized to access this route.';

postsRouter.post('/create', token, catchAsync(async (req, res, next) => {
            console.log(req.body)
            console.log(req.user)
        req.body.authorId = req.user.id;
        const { title, content, authorId } = req.body;
        console.log(authorId)
    if ( !title || !content || !authorId ) {
        res.send({
            name: 'Error Creating Post',
            message: 'Please enter a title, content, and authorId',
            success: false,
        });
    }else if (req.user.id !== authorId) {
        res.send({
            name: 'Error Creating Post',
            message: UnauthorizedError(),
            success: false,
        });
    } else {
    const post = await createPost({ title, content, authorId });
        res.send({
            name: 'Success Creating Post',
            message: 'Post Created!!!',
            post,
            success: true,
    });
    }
 }));


postsRouter.get('/all', catchAsync(async (req, res, next) => {
    const posts = await getAllPosts();
        res.send({
            name: 'Success Getting All Posts',
            message: 'Posts Retrieved!!!',
            posts,
            success: true,
    });
 }));

 postsRouter.get('/:postId', catchAsync(async (req, res, next) => {
    const { postId } = req.params;
    const post = await getPostById(postId);
    if (!post) {
        res.send({
            name: 'Error Getting Post',
            message: 'Post not found',
            success: false,
        });
    } else {
    res.send({
            name: 'Success Getting Post',
            message: 'Post Retrieved!!!',
            post,
            success: true,
    });
    }
 }));

 postsRouter.get('/user/:userId', catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    const posts = await getPostsByUser(userId);
        res.send({
            name: 'Success Getting User Posts',
            message: 'Posts Retrieved!!!',
            posts,
            success: true,
        });
 }));

postsRouter.patch('/:postId', token, catchAsync(async (req, res, next) => {
    const { postId } = req.params;
    console.log(req.user)
    const updatedPost = await getPostById(postId);
    console.log(updatedPost)
    if ( !updatedPost ) {
        res.send({
            name: 'Error Updating Post',
            message: 'Post not found',
            success: false,
        })
    } else if ( req.user.id !== updatedPost.authorId ) {
        res.send({
            name: 'Error Updating Post',
            message: 'You must be the post author to update it.',
            success: false,
        });
    }else{
    const fields = req.body;
    const post = await updatePost(postId, fields);
        res.send({
            name: 'Success Updating Post',
            message: 'Post Updated!!!',
            post,
            success: true,
        });
    }
}));

postsRouter.delete('/:postId',token,catchAsync(async (req, res, next) => {
        const { postId } = req.params;
        const post = await getPostById(postId);
        console.log(post)
        if ( !post ){
            res.send({
                name: 'Error Deleting Post',
                message: 'Post not found',
                success: false,
            });
        } else if ( req.user.id !== post.authorId ) {
            res.send({
                name: 'Error Deleting Post',
                message: 'You must be the post author to delete it.',
                success: false,
            });
        } else {
        const deletedPost = await deletePost(post.id);
        res.send({
                name: 'Success Deleting Post',
                message: 'Post Deleted!!!',
                post,
                success: true,
            });
        } 
}));

//-------------------------------------Comments----------------------------------------------

postsRouter.post('/:postId/comments', token, catchAsync(async (req, res, next) => {
   const { postId } = req.params;
   req.params.postId = postId;
    console.log(postId)
    req.body.authorId = req.user.id;
    console.log(req.body)
    const { authorId, title, body } = req.body;
    if (!postId || !authorId || !title || !body) {
        res.send({
            name: 'Error Creating Comment',
            message: 'Please enter a postId, authorId, title, and body',
            success: false,
        });
    } else if (req.user.id !== authorId) {
        res.send({
            name: 'Error Creating Comment',
            message: UnauthorizedError(),
            success: false,
        });
    } else {
        const comment = await createComment({ postId, authorId, title, body });
        res.send({
            name: 'Success Creating Comment',
            message: 'Comment Created!!!',
            comment,
            success: true,
        });
    }
}))

module.exports = postsRouter;
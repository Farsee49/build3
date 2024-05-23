const client = require('./client');


async function createComment({ postId, authorId, title, body }) {
    try {
        const { rows: [comment] } = await client.query(`
      INSERT INTO comments("postId", "authorId", title, body)
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `, [postId, authorId, title, body]);
        return comment;
    } catch (error) {
        throw error;
    }
};


async function getAllComments() {
    try {
        const { rows } = await client.query(`
      SELECT *
      FROM comments;
    `);
        return rows;
    } catch (error) {
        throw error;
    }
};

async function getCommentById(commentId) {
    try {
        const { rows: [comment] } = await client.query(`
      SELECT *
      FROM comments
      WHERE id=$1;
    `, [commentId]);
        return comment;
    } catch (error) {
        throw error;
    }
};


async function getCommentsByPostId(postId) {
    try {
        const { rows } = await client.query(`
      SELECT *
      FROM comments
      WHERE "postId"=$1;
    `, [postId]);
        return rows;
    } catch (error) {
        throw error;
    }
};

async function getCommentsByUser(userId) {
    try {
        const { rows } = await client.query(`
      SELECT *
      FROM comments
      WHERE "authorId"=$1;
    `, [userId]);
        return rows;
    } catch (error) {
        throw error;
    }
};
async function attachCommentsToPosts(posts) {
    try{
        const { rows: comments } = await client.query(`
        SELECT * FROM comments
        WHERE "postId" IN (${posts.map(post => post.id).join(',')})
        ;`)
        const allComments = await getAllComments();
        const postsWithComments = posts.map(post => {
            post.comments = comments.filter(comment => comment.postId === post.id);
            return post;
        });
        return postsWithComments;
    } catch (error) {
        console.error("Error attaching comments to posts!");
 }
};

async function addCommentsToPost(post) {
    try {
        const { rows: comments } = await client.query(`
      SELECT *
      FROM comments
      WHERE "postId"=$1;
    `, [post.id]);
        post.comments = comments;
        return post;
    } catch (error) {
        throw error;
    }
}

async function updateComment(commentId, fields = {}) {
    console.log('fields',fields)
    console.log('commentId',commentId)
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [comment] } = await client.query(`
      UPDATE comments
      SET ${setString}
      WHERE id=${commentId}
      RETURNING *;
    `, Object.values(fields));
        return comment;
    } catch (error) {
        throw error;
    }
 };

async function deleteComment(commentId) {
    try {
        await client.query(`
      DELETE FROM comments
      WHERE id=$1;
    `, [commentId]);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createComment,
    getAllComments,
    getCommentsByPostId,
    getCommentsByUser,
    updateComment,
    deleteComment,
    attachCommentsToPosts,
    addCommentsToPost,
    getCommentById
    
};
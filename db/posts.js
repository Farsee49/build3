const client = require('./client');


async function createPost({ authorId, title, content }) {
    try {
        const { rows: [post] } = await client.query(`
      INSERT INTO posts("authorId", title, content)
      VALUES($1, $2, $3)
      RETURNING *;
    `, [authorId, title, content]);
        return post;
    } catch (error) {
        throw error;
    }
};

async function getAllPosts() {
    try {
        const { rows } = await client.query(`
      SELECT *
      FROM posts;
    `);
        return rows;
    } catch (error) {
        throw error;
    }
};

async function getPostById(postId) {
    try {
        const { rows: [post] } = await client.query(`
      SELECT *
      FROM posts
      WHERE id=$1;
    `, [postId]);
        return post;
    } catch (error) {
        throw error;
    }
};

async function getPostsByUser(userId) {
    try {
        const { rows } = await client.query(`
      SELECT *
      FROM posts
      WHERE "authorId"=$1;
    `, [userId]);
        return rows;
    } catch (error) {
        throw error;
    }
};

async function updatePost(postId, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [post] } = await client.query(`
      UPDATE posts
      SET ${setString}
      WHERE id=${postId}
      RETURNING *;
    `, Object.values(fields));
        return post;
    } catch (error) {
        throw error;
    }
};

async function deletePost(postId) {
    try {
        await client.query(`
        DELETE FROM comments
        WHERE "postId"=$1;
        `, [postId]);
        
        await client.query(`
      DELETE FROM posts
      WHERE id=$1;
    `, [postId]);
    } catch (error) {
        throw error;
    }
};

async function getPostByCommentId(commentId) {
    try {
        const { rows: [post] } = await client.query(`
      SELECT *
      FROM posts
      JOIN comments ON posts.id = comments."postId"
      WHERE comments.id=$1;
    `, [commentId]);
        return post;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    getPostsByUser,
    updatePost,
    deletePost,
    getPostByCommentId
};
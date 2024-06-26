const client = require('./client');



async function createUser({ username, password }) {
    try {
        const { rows: [user] } = await client.query(`
        INSERT INTO users(username, password)
        VALUES($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
      `, [username, password]);
        return user;
    } catch (error) {
        throw error;
    }
};

async function getAllUsers() {
    try {
        const { rows } = await client.query(`
        SELECT id, username
        FROM users;
      `);
        return rows;
    } catch (error) {
        throw error;
    }
};

async function getUser({ username, password }) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1
        AND password=$2;
      `, [username, password]);
        return user;
    } catch (error) {
        throw error;
    }
};

async function getUserById(userId) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE id=$1;
      `, [userId]);
        return user;
    } catch (error) {
        throw error;
    }
};


async function getUserByUsername(username) {
    try {
        const { rows: [user] } = await client.query(`
        SELECT *
        FROM users
        WHERE username=$1;
      `, [username]);
        return user;
    } catch (error) {
        throw error;
    }
};

async function updateUser(id, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        const { rows: [user] } = await client.query(`
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `, Object.values(fields));
        return user;
    } catch (error) {
        throw error;
    }
};

async function deleteUser(userId) {
    try {
        await client.query(`
        DELETE FROM users
        WHERE id=$1;
      `, [userId]);
    } catch (error) {
        throw error;
    }
};



module.exports = {
    createUser,
    getAllUsers,
    getUser,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser
};
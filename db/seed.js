const client = require('./client');
const { createPost } = require('./posts');
const { createUser } = require('./users');
const { createComment } = require('./comments');


    async function dropTables() {
        try {
            console.log("Starting to drop tables...");
            await client.query(`
            DROP TABLE IF EXISTS post_comments;
            DROP TABLE IF EXISTS comments;
            DROP TABLE IF EXISTS posts;
            DROP TABLE IF EXISTS users;
          `);
            console.log("Finished dropping tables!");
        } catch (error) {
            console.error("Error dropping tables!");
            throw error;
        }
    };


    async function createTables() {
        try {
            console.log("Starting to build tables...");
            await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    username varchar UNIQUE NOT NULL,
                    password varchar NOT NULL
                );
                CREATE TABLE posts (
                    id SERIAL PRIMARY KEY,
                    "authorId" INTEGER REFERENCES users(id),
                    title varchar NOT NULL,
                    content TEXT NOT NULL
                );
                CREATE TABLE comments (
                    id SERIAL PRIMARY KEY,
                    "postId" INTEGER REFERENCES posts(id),
                    "authorId" INTEGER REFERENCES users(id),
                    title varchar NOT NULL,
                    body TEXT NOT NULL
                );
                CREATE TABLE post_comments (
                    id SERIAL PRIMARY KEY,
                    "postCommentId" INTEGER REFERENCES posts(id),
                    "commentId" INTEGER REFERENCES comments(id)
                );
            `);
            console.log("Finished building tables!");
        } catch (error) {
            console.error("Error building tables!");
            throw error;
        }
    };


    async function createInitialUsers() {
        console.log("Starting to create users...");
        try {
            const usersToCreate = [
                { username: 'albert', password: 'bertie99' },
                { username: 'sandra', password: 'sandra99' },
                { username: 'fishboy', password: 'fishboy99'},
                { username: 'admin', password: 'admin99' }
            ];
            const users = await Promise.all(usersToCreate.map(createUser));
            console.log("Users created:");
            console.log(users);
            console.log("Finished creating users!");
        } catch (error) {
            console.error("Error creating users!");
            throw error;
        }
    };

    async function createInitialPosts() {
        console.log("Starting to create posts...");
        try {
            const postsToCreate = [
                { authorId: 3, title: "First Post", content: "This is my first post." },
                { authorId: 2, title: "Second Post", content: "This is my second post." },
                { authorId: 1, title: "Third Post", content: "This is my third post." }
            ];
            const posts = await Promise.all(postsToCreate.map(createPost));
            console.log("Posts created:");
            console.log(posts);
            console.log("Finished creating posts!");
        } catch (error) {
            console.error("Error creating posts!");
            throw error;
        }
    };

    async function createInitialComments() {
        console.log("Starting to create comments...");
        try {
            const commentsToCreate = [
                { postId: 1, authorId: 2, title: "First Comment", body: "This is my first comment." },
                { postId: 2, authorId: 1, title: "Second Comment", body: "This is my second comment." },
                { postId: 1, authorId: 2, title: "Third Comment", body: "This is my third comment." }
            ];
            const comments = await Promise.all(commentsToCreate.map(createComment));
            console.log("Comments created:");
            console.log(comments);
            console.log("Finished creating comments!");
        } catch (error) {
            console.error("Error creating comments!");
            throw error;
        }
    };

    async function createDb() {
        console.log("Starting to build the database...");
        try {
            client.connect();
            await dropTables();
            await createTables();
            await createInitialUsers();
            await createInitialPosts();
            await createInitialComments();
        } catch (error) {
            console.error("Error creating database!");
            throw error;
        }
        console.log("Finished building the database!");
    };

    createDb().catch(console.error).finally(() => client.end());
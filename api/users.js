const express = require('express');
const usersRouter = express.Router();
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = process.env;
const catchAsync = require('../utils/catchAsync');
const { token } = require('../utils/auth');
const requireUser = require('../utils/auth');
const {
    getUserByUsername,
    createUser,
    getUser,
    getUserById,
    getAllUsers,
    deleteUser,
    getPostsByUser
} = require('../db');

const UnauthorizedError = () => 'You are not authorized to access this route.';
const PasswordTooShortError = () => 'Password must be at least 8 characters long.';
const UserTakenError = (username) => `The username ${username} is already taken.`;


//=====================================================================

// POST /api/users/register
usersRouter.post('/register', catchAsync(async (req, res, next) => {
    //console.log('AT REGISTER ')
    const { username, password} = req.body;
        if (!username || !password) {
          res.send({
            error: 'Missing Usernamen or Password',
            name: 'Missing username or password',
            message: 'Please enter a username and password.',
          });
        } else if (password.length < 5) {
          res.send({
            error: 'PasswordTooShort',
            name: 'PasswordTooShort',
            message: PasswordTooShortError(),
          });
        } else {
          const _user = await getUserByUsername(username);
          if (_user) {
          res.send({
              error: 'Username already taken',
              name: 'UsernameAlreadyTaken',
              message: UserTakenError(_user.username),
            });
          } else {
            const user = await createUser({ username, password});
            if (user) {
              const token = jwt.sign(user, JWT_SECRET);
              res.send({
                name: 'Success Registering!!!',
                message: 'Welcome You are Logged in!!!',
                token,
                user,
                success: true,
              });
          }}
        }
    }));
  
  
  
  //=====================================================================
  
  // POST /api/users/login
  usersRouter.post('/login', catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
      if (!username || !password) {
        res.send({
          error: 'MissingUsernameOrPassword',
          name: 'Missing username or password',
          message: 'Please enter a username and password.',
          success: false
        });
      } else {
        const user = await getUser({ username, password });
        if (user) {
          const token = jwt.sign(user, JWT_SECRET);
           res.send({ 
            message: "Login Successful, Welcome!", 
            success: true, 
            token: token, 
            user: user,
            loggedIn: true
          });
        } else {
          res.send({
            error: 'InvalidCredentials',
            name: 'InvalidCredentials',
            message: 'Username or password is incorrect.',
          });
        }
      }
  }));
  
  //=====================================================================
  
  // GET /api/users/me
  usersRouter.get('/me', catchAsync(async (req, res, next) => {
    console.log('req.header', req.header('Authorization'))
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');
    //console.log(auth)
      if (!auth) {
        res.status(401).send({
          error: 'Requirements',
          name: 'Login',
          message: UnauthorizedError()
        });
        } else if (auth.startsWith(prefix)) {
          const token = auth.slice(prefix.length);
          const { id } = jwt.verify(token, JWT_SECRET);
          if (id) {
            req.user = await getUserById(id);
            console.log('USERNAME', req.user)
            res.send(req.user);
        
            return req.user;
           
            
          }
        }
  }));
  
  
  //=====================================================================
  
  //GET /api/users
  usersRouter.get('/allusers', token,catchAsync(async (req, res) => {
console.log('AT all users', req.user)
    if (!req.user) {
        res.send({
            error: 'Unauthorized',
            name: 'Unauthorized',
            message: 'You are not authorized to access this route.',
        });
        return;
    } else {
        const users = await getAllUsers();
        res.send(users);
    }
  }));
  
  
  //=====================================================================
  
  //DELETE /api/users/:userId
  usersRouter.delete('/:userId', catchAsync(async (req, res, next) => {
    const { userId } = req.params;
      const user = await getUserById(userId);
      if (user) {
        const deletedUser = await deleteUser(userId);
        res.send(deletedUser);
      } else {
        res.send({
          error: 'UserNotFound',
          name: 'UserNotFound',
          message: 'User not found.',
        });
      }
  }));
  
  //=====================================================================

  //GET /api/users/:username/posts
  usersRouter.get('/:username/posts', token, catchAsync(async (req, res, next) => {
    const { username } = req.params;
    console.log('req.user', req.user)
    const user = await getUserByUsername(username);
    console.log('USER', user)
    if (!user) {
      res.send({
        error: 'UserNotFound',
        name: 'UserNotFound', 
        message: 'User not found.'
      });
    } else {
      const posts = await getPostsByUser(user.id);
      res.send(posts);
    }
  }));

module.exports = usersRouter;
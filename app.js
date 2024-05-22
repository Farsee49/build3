const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const client = require('./db/client');
const cors = require('cors');
const apiRouter = require('./api');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));                                                           
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);

// app.use(async (req, res, next) => {
//     const prefix = 'Bearer ';
//     const auth = req.header('Authorization');
//     if (!auth) {
//       next();
//     } else if (auth.startsWith(prefix)) {
//       const token = auth.slice(prefix.length);
//       try {
//         const { id } = jwt.verify(token, JWT_SECRET);
//         if (id) {
//           req.user = await getUserById(id);
//           confirmUser = req.user;
//           console.log('CONFIRM USER', confirmUser)
//           next();
//         }
//       } catch ({ name, message }) {
//         next({ name, message });
//       }
//     } else {
//       next({
//         name: 'AuthorizationHeaderError',
//         message: `Authorization token must start with ${ prefix }`
//       });
//     }
//   });


app.listen(PORT, async () => {
    console.log(`Server is running on ${PORT}!`);
  
    try {
      await client.connect();
      console.log('Database is open for business!');
    } catch (error) {
      console.error('Database is closed for repairs!\n', error);
    }
  });
 
  


module.exports = app;
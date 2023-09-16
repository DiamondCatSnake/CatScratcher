const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const router = require('./routes/Router');
const app = express();

const PORT = 3000;

// don't forget to import models

// connect with mongoose database
mongoose.connect('mongodb+srv://gmogi92:basketball123@cluster0.jtsrl7y.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'A really secure secret key', // Replace with a secret key
    resave: false,
    saveUninitialized: true,
  })
);

//statically serve everything in dist folder on static call
app.use(express.static(path.join(__dirname, '../dist')));
// app.use('/stylesheets', express.static(path.join(__dirname, '../client/stylesheets')));  <----------- DEPENDENT ON FRONT END STYLING DOCUMENTS


app.use('/route', router);


//Global error handler
app.use((req, res) => res.status(404).send('Status Code 404: Page not found...'));
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred in global error handler' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app.listen(PORT, () => console.log('Listening in on PORT: ', PORT));
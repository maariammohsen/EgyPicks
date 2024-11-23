const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');

const app = express();
///middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); //building middleware function used to parse data

// app.use(express.static(''));   //to use static files
app.use((req, res, next) => {
  console.log('hello from the middleware');
  next(); //NEVERRR FORGETT TOOO USEEE NEXTT IN OUR MIDDLEWARE!!!!!
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next(); //NEVERRR FORGETT T OOO USEEE NEXTT IN OUR MIDDLEWARE!!!!!
});

///routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
///starting the server
module.exports = app;

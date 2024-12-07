const express = require('express');
const morgan = require('morgan');
const cookie = require('cookie-parser');
const appError = require('./util/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const app = express();

///middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json()); //building middleware function used to parse data

app.use(express.static(`${__dirname}/images`));
app.use(cookie());
///routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.all('*', (req, res, next) => {
  next(new appError(`can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);



///starting the server

module.exports = app;

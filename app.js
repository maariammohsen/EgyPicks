const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet'); //headers for more security
const cookie = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const appError = require('./util/appError');
const globalErrorHandler = require('./controllers/errorController');

const orderController = require('./controllers/orderController');

const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const orderRouter = require('./routes/orderRoutes');
const brandRouter = require('./routes/brandRouter');
const discountRouter = require('./routes/discountRoutes');

const app = express();

app.enable('trust proxy');

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,OPTIONS,POST,DELETE',
    allowedHeaders: '*',
    credentials: true,
  })
);

app.options('*', cors());
///middlewares
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  orderController.webhookSession
);
// const limiter = rateLimit({
//   max: 100,
//   windowMS: 60 * 60 * 1000,
//   message:
//     'Too many requests were received from this IP , Please try again in an hour!',
// });
// app.use('/api', limiter);
app.use(express.json()); //building middleware function used to parse data
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(express.static(path.join(__dirname, 'images')));
app.use(cookie());
///routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/brands', brandRouter);
app.use('/api/v1/discounts', discountRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new appError(`can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

///starting the server

module.exports = app;

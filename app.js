const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

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

///route handlers

// app.get('/api/v1/tours' , getAllTours); //api to request all tours & it's consumed response
// app.get('/api/v1/tours/:id' , getTour);
// app.post('/api/v1/tours' , createTour);
// app.delete('/api/v1/tours/:id' , deleteTour);
// app.patch('/api/v1/tours/:id', updateTour);

///routes

app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', userRouter);
///starting the server
module.exports = app;

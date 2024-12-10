const appError = require('../util/appError');

const CastErrorHandler = (err) => {
  ///invalid id
  const message = `invalid ${err.path}:${err.value}`;
  return new appError(message, 400);
};
const DuplicateFieldHandler = (err) => {
  const message = `Duplicate field value: ${JSON.stringify(err.keyValue)
    .split(':')[1]
    .slice(1, -2)}. please use another value`;
  return new appError(message, 400);
};

const ValidatorErrorHandler = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('.')}`;
  return new appError(message, 400);
};

const JWTErrorHandler = () => {
  return new appError('Invalid token. please log in again', 401);
};

const TokenExpiredErrorHandler = () => {
  return new appError('Your token has been expired. please log in again', 401);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // stack: err.stack,
    error: err,
  });
};
const sendErrorProduction = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR', err);
    res.status(500).json({
      status: 'Error',
      message: 'Oops! something went wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (err.name === 'CastError') error = CastErrorHandler(error);
    if (err.code === 11000) error = DuplicateFieldHandler(error);
    if (err.name === 'ValidationError') error = ValidatorErrorHandler(error);
    if (err.name === 'JsonWebTokenError') error = JWTErrorHandler();
    if (err.name === 'TokenExpiredError') error = TokenExpiredErrorHandler();
    sendErrorProduction(error, res);
  }
};

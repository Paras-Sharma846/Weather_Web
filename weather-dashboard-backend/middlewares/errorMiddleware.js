const STATUS_CODES = require('../utils/statusCode');

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack, 
  });
};

module.exports = { errorHandler };

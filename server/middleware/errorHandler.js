const mongoose = require('mongoose')

function errorHandler(error, request, response, next) {
  let statusCode = error.statusCode || 500
  let message = error.message

  if (error.code === 11000) {
    statusCode = 409
    message = 'A record with that unique value already exists.'
  } else if (error.name === 'ValidationError' || error.name === 'CastError') {
    statusCode = 400
  } else if (mongoose.connection.readyState !== 1 && statusCode === 500) {
    statusCode = 503
    message = 'The database is currently unavailable.'
  }

  response.status(statusCode).json({
    success: false,
    message: statusCode >= 500 ? 'The request could not be completed.' : message,
  })
}

module.exports = errorHandler
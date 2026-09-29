const mongoose = require('mongoose')

function getHealth(request, response) {
  const isDatabaseConnected = mongoose.connection.readyState === 1

  response.status(isDatabaseConnected ? 200 : 503).json({
    success: isDatabaseConnected,
    api: { status: 'ok' },
    database: { status: isDatabaseConnected ? 'connected' : 'disconnected' },
  })
}

module.exports = { getHealth }
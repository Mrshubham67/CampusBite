const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const app = require('./app')
const { connectDatabase, disconnectDatabase } = require('./config/database')

const port = process.env.PORT || 5000

async function startServer() {
  let server

  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    console.error('Unable to start CampusBite: set JWT_SECRET to a random value of at least 32 characters in server/.env.')
    process.exit(1)
  }

  try {
    await connectDatabase()
    server = app.listen(port, () => {
      console.log(`CampusBite API listening on port ${port}`)
    })
  } catch (error) {
    console.error('Unable to start CampusBite because MongoDB could not be reached.')
    console.error('Check server/.env MONGODB_URI, Atlas network access, and database user permissions.')
    const errorCode = error.code || (error.cause && error.cause.code)
    console.error(`MongoDB error code: ${errorCode || error.name || 'UnknownError'}`)
    process.exit(1)
  }

  let isShuttingDown = false

  async function shutDown(signal) {
    if (isShuttingDown) return
    isShuttingDown = true
    console.log(`${signal} received. Closing the API server.`)

    server.close(async () => {
      try {
        await disconnectDatabase()
        console.log('MongoDB connection closed.')
        process.exitCode = 0
      } catch (error) {
        console.error('Unable to close the MongoDB connection cleanly.')
        process.exitCode = 1
      }
    })
  }

  process.once('SIGINT', () => shutDown('SIGINT'))
  process.once('SIGTERM', () => shutDown('SIGTERM'))
}

startServer()
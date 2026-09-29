const mongoose = require('mongoose')

let hasConnected = false
let isClosing = false

mongoose.connection.on('connected', () => {
  hasConnected = true
})

mongoose.connection.on('disconnected', () => {
  if (hasConnected && !isClosing) {
    console.warn('MongoDB connection was lost. The driver will attempt to reconnect.')
  }
})

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB connection restored.')
})

mongoose.connection.on('error', () => {
  console.error('MongoDB reported a connection error.')
})

async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not configured.')
  }

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 })
  } catch (error) {
    await mongoose.disconnect()
    throw error
  }

  console.log('Connected to MongoDB.')
}

async function disconnectDatabase() {
  isClosing = true
  await mongoose.disconnect()
}

module.exports = { connectDatabase, disconnectDatabase }
const cors = require('cors')
const express = require('express')
const healthRoutes = require('./routes/healthRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const foodRoutes = require('./routes/foodRoutes')
const authRoutes = require('./routes/authRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express()

const clientOrigin = process.env.CLIENT_URL || (
  process.env.NODE_ENV === 'production' ? false : 'http://localhost:5173'
)

app.use(cors({ origin: clientOrigin }))
app.use(express.json())

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/foods', foodRoutes)

app.use((request, response, next) => {
  const error = new Error(`Route not found: ${request.method} ${request.originalUrl}`)
  error.statusCode = 404
  next(error)
})

app.use(errorHandler)

module.exports = app
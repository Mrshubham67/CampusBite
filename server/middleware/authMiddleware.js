const jwt = require('jsonwebtoken')
const User = require('../models/User')

function getJwtSecret() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    const error = new Error('Authentication is not configured on this server.')
    error.statusCode = 500
    throw error
  }
  return process.env.JWT_SECRET
}

async function authenticate(request, response, next) {
  const authorization = request.headers.authorization || ''
  const [scheme, token] = authorization.split(' ')

  if (scheme !== 'Bearer' || !token) {
    return response.status(401).json({ success: false, message: 'Authentication required.' })
  }

  let payload
  try {
    payload = jwt.verify(token, getJwtSecret())
  } catch (error) {
    if (error.statusCode) return next(error)
    return response.status(401).json({ success: false, message: 'Invalid or expired token.' })
  }

  try {
    const user = await User.findById(payload.sub)
    if (!user) {
      return response.status(401).json({ success: false, message: 'Invalid or expired token.' })
    }
    request.user = user
    return next()
  } catch (error) {
    return next(error)
  }
}

function authorizeRoles(...roles) {
  return function checkRole(request, response, next) {
    if (!request.user || !roles.includes(request.user.role)) {
      return response.status(403).json({ success: false, message: 'You do not have permission to do that.' })
    }
    return next()
  }
}

module.exports = { authenticate, authorizeRoles }
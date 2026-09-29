const jwt = require('jsonwebtoken')
const User = require('../models/User')

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function requestError(message, statusCode) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

function getJwtSecret() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw requestError('Authentication is not configured on this server.', 500)
  }
  return process.env.JWT_SECRET
}

function createToken(userId) {
  return jwt.sign(
    { sub: userId.toString() },
    getJwtSecret(),
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
  )
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
  }
}

async function register(request, response) {
  const { name, email, password, phone } = request.body || {}

  if (typeof name !== 'string' || !name.trim() || name.trim().length > 80) {
    throw requestError('Name is required and must be 80 characters or fewer.', 400)
  }
  if (typeof email !== 'string' || email.length > 254 || !emailPattern.test(email.trim())) {
    throw requestError('Enter a valid email address.', 400)
  }
  if (typeof password !== 'string' || password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) {
    throw requestError('Password must be at least 8 characters and no more than 72 bytes.', 400)
  }
  if (phone !== undefined && (typeof phone !== 'string' || phone.trim().length > 24)) {
    throw requestError('Phone must be a string of 24 characters or fewer.', 400)
  }

  const user = await User.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    passwordHash: password,
    phone: phone ? phone.trim() : '',
  })

  response.status(201).json({
    success: true,
    token: createToken(user._id),
    user: publicUser(user),
  })
}

async function login(request, response) {
  const { email, password } = request.body || {}
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw requestError('Email and password are required.', 400)
  }
  if (Buffer.byteLength(password, 'utf8') > 72) {
    throw requestError('Password must be no more than 72 bytes.', 400)
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+passwordHash')
  if (!user || !(await user.comparePassword(password))) {
    throw requestError('Invalid email or password.', 401)
  }

  response.json({
    success: true,
    token: createToken(user._id),
    user: publicUser(user),
  })
}

function getCurrentUser(request, response) {
  response.json({
    success: true,
    user: publicUser(request.user),
  })
}

module.exports = { register, login, getCurrentUser }
const express = require('express')
const authController = require('../controllers/authController')
const { authenticate } = require('../middleware/authMiddleware')
const asyncHandler = require('../utils/asyncHandler')

const router = express.Router()

router.post('/register', asyncHandler(authController.register))
router.post('/login', asyncHandler(authController.login))
router.get('/me', authenticate, asyncHandler(authController.getCurrentUser))

module.exports = router
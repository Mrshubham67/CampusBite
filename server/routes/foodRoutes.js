const express = require('express')
const foodController = require('../controllers/foodController')
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware')
const asyncHandler = require('../utils/asyncHandler')

const router = express.Router()

router.route('/')
  .get(asyncHandler(foodController.getFoods))
  .post(authenticate, authorizeRoles('admin'), asyncHandler(foodController.createFood))

router.route('/:id')
  .get(asyncHandler(foodController.getFood))
  .put(authenticate, authorizeRoles('admin'), asyncHandler(foodController.updateFood))
  .delete(authenticate, authorizeRoles('admin'), asyncHandler(foodController.deleteFood))

module.exports = router
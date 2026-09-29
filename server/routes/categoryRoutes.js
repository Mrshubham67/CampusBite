const express = require('express')
const categoryController = require('../controllers/categoryController')
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware')
const asyncHandler = require('../utils/asyncHandler')

const router = express.Router()

router.route('/')
  .get(asyncHandler(categoryController.getCategories))
  .post(authenticate, authorizeRoles('admin'), asyncHandler(categoryController.createCategory))

router.route('/:id')
  .get(asyncHandler(categoryController.getCategory))
  .put(authenticate, authorizeRoles('admin'), asyncHandler(categoryController.updateCategory))
  .delete(authenticate, authorizeRoles('admin'), asyncHandler(categoryController.deleteCategory))

module.exports = router
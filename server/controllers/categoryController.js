const Category = require('../models/Category')
const Food = require('../models/Food')
const pickRequestFields = require('../utils/pickRequestFields')

const categoryFields = ['name', 'description', 'image', 'isActive']

function notFoundError() {
  const error = new Error('Category not found.')
  error.statusCode = 404
  return error
}

async function getCategories(request, response) {
  const categories = await Category.find().sort({ name: 1 })
  response.json({ success: true, data: categories })
}

async function getCategory(request, response) {
  const category = await Category.findById(request.params.id)
  if (!category) throw notFoundError()
  response.json({ success: true, data: category })
}

async function createCategory(request, response) {
  const fields = pickRequestFields(request.body, categoryFields)
  const category = await Category.create(fields)
  response.status(201).json({ success: true, data: category })
}

async function updateCategory(request, response) {
  const fields = pickRequestFields(request.body, categoryFields)
  if (Object.keys(fields).length === 0) {
    const error = new Error('Provide at least one category field to update.')
    error.statusCode = 400
    throw error
  }

  const category = await Category.findByIdAndUpdate(request.params.id, fields, {
    new: true,
    runValidators: true,
  })
  if (!category) throw notFoundError()
  response.json({ success: true, data: category })
}

async function deleteCategory(request, response) {
  const hasFoods = await Food.exists({ category: request.params.id })
  if (hasFoods) {
    const error = new Error("Move or delete this category's food items before deleting the category.")
    error.statusCode = 409
    throw error
  }

  const category = await Category.findByIdAndDelete(request.params.id)
  if (!category) throw notFoundError()
  response.json({ success: true, message: 'Category deleted.' })
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
}
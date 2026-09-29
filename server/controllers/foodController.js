const Category = require('../models/Category')
const Food = require('../models/Food')
const pickRequestFields = require('../utils/pickRequestFields')

const foodFields = [
  'name',
  'description',
  'price',
  'image',
  'category',
  'isVeg',
  'rating',
  'reviewCount',
  'preparationTime',
  'isAvailable',
  'isPopular',
  'customizationOptions',
]

function notFoundError() {
  const error = new Error('Food item not found.')
  error.statusCode = 404
  return error
}

async function validateCategory(categoryId) {
  if (categoryId && !(await Category.exists({ _id: categoryId }))) {
    const error = new Error('The selected category does not exist.')
    error.statusCode = 400
    throw error
  }
}

async function getFoods(request, response) {
  const foods = await Food.find().populate('category', 'name').sort({ name: 1 })
  response.json({ success: true, data: foods })
}

async function getFood(request, response) {
  const food = await Food.findById(request.params.id).populate('category', 'name')
  if (!food) throw notFoundError()
  response.json({ success: true, data: food })
}

async function createFood(request, response) {
  const fields = pickRequestFields(request.body, foodFields)
  await validateCategory(fields.category)
  const food = await Food.create(fields)
  response.status(201).json({ success: true, data: food })
}

async function updateFood(request, response) {
  const fields = pickRequestFields(request.body, foodFields)
  if (Object.keys(fields).length === 0) {
    const error = new Error('Provide at least one food field to update.')
    error.statusCode = 400
    throw error
  }

  await validateCategory(fields.category)
  const food = await Food.findByIdAndUpdate(request.params.id, fields, {
    new: true,
    runValidators: true,
  }).populate('category', 'name')
  if (!food) throw notFoundError()
  response.json({ success: true, data: food })
}

async function deleteFood(request, response) {
  const food = await Food.findByIdAndDelete(request.params.id)
  if (!food) throw notFoundError()
  response.json({ success: true, message: 'Food item deleted.' })
}

module.exports = {
  getFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
}
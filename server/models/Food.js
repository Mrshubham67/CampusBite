const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: '',
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    isVeg: {
      type: Boolean,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      min: 0,
      default: 0,
    },
    preparationTime: {
      type: Number,
      min: 0,
      default: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    customizationOptions: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true, bufferCommands: false },
)

foodSchema.index({ category: 1, isAvailable: 1 })

module.exports = mongoose.model('Food', foodSchema)
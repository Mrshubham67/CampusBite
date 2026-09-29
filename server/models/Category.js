const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 300,
      default: '',
    },
    image: {
      type: String,
      trim: true,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, bufferCommands: false },
)

module.exports = mongoose.model('Category', categorySchema)
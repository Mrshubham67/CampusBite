const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 24,
      default: '',
    },
  },
  { timestamps: true, bufferCommands: false },
)

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('passwordHash')) return
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12)
})

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.passwordHash)
}

userSchema.set('toJSON', {
  transform(document, returnedUser) {
    delete returnedUser.passwordHash
    delete returnedUser.__v
    return returnedUser
  },
})

module.exports = mongoose.model('User', userSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const valid = require('validator')

const userSchema = new Schema({
  firstname: {
    type: String,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => {
        return valid.isEmail(v)
      },
      message: (props) => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    minlength: 6
  }
})

const User = mongoose.model('students', userSchema)

module.exports = User
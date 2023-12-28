import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
    match: [/^[a-zA-Z0-9._%+-]+@stonybrook\.edu$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
  }
})

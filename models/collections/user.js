import { Schema, model, models } from 'mongoose'
import {MajorType, UniversityCode} from "@components/constants/values";

const UserSchema = new Schema({
  initialized: { type: Boolean, required: true, default: false},
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  universityCode: {
    type: String,
    enum: Object.values(UniversityCode),
    required: [true, 'UniversityId is required!'],
  },
  major: {
    type: String,
    required: true,
    default: MajorType.NONE
  },
  createdAt: { type: Date, required: true, default: new Date() },
})

const User = models.User || model("User", UserSchema)

export default User

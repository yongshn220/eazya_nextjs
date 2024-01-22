import { Schema, model, models } from 'mongoose'
import {MajorType, UniversityIds} from "@components/constants/values";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
  },
  universityId: {
    type: String,
    enum: Object.values(UniversityIds),
    required: [true, 'UniversityId is required!'],
  },
  major: {
    type: String,
    required: true,
    default: MajorType.NONE
  }
})

const User = models.User || model("User", UserSchema)

export default User

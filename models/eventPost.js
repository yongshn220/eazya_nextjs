import { Schema, model, models } from 'mongoose'
import {UniversityIds} from "@components/constants/values";

const EventPostSchema = new Schema({
  authorId:       { type: Schema.Types.ObjectId, ref: 'User', required: true },
  universityId:   { type: String, enum: Object.values(UniversityIds), required: true, },
  image:          { type: String, default: "" },
  title:          { type: String, required: true, },
  date:           { type: String, default: "", },
  time:           { type: String, default: "", },
  location:       { type: String },
  description:    { type: String, required: true, },
  createdAt:      { type: Date, required: true, },
  outOfService:   { type: Boolean, required: true, },
  voteUsers:      {
    upvoted:        [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvoted:      [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  comments:       [{
    _id:            { type: Schema.Types.ObjectId, required: true },
    authorId:       { type: Schema.Types.ObjectId, required: true },
    authorName:     { type: String, required: true },
    content:        { type: String, required: true },
    createdAt:      { type: Date, required: true },
    isSecret:       { type: Boolean, default: false, required: true },
    replies:        [{
      _id:            { type: Schema.Types.ObjectId, required: true },
      authorId:       { type: Schema.Types.ObjectId, required: true },
      authorName:     { type: String, required: true },
      content:        { type: String, required: true },
      createdAt:      { type: Date, required: true },
      isSecret:       { type: Boolean, default: false, required: true },
    }]
  }],
})

const EventPost = models.EventPost || model("EventPost", EventPostSchema)

export default EventPost

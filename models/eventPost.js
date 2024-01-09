import { Schema, model, models } from 'mongoose'
import {UniversityIds} from "@components/constants/values";
import {PostType} from "@components/constants/enums";
import CommentBaseSchema from "@models/commentBase";

const EventPostSchema = new Schema({
  authorId:       { type: Schema.Types.ObjectId, ref: 'User', required: true },
  universityId:   { type: String, enum: Object.values(UniversityIds), required: true, },
  type:           { type: String, enum: Object.values(PostType), required: true, },
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
})

const EventPost = models.EventPost || model("EventPost", CommentBaseSchema.discriminator("EventPost", EventPostSchema))
export default EventPost

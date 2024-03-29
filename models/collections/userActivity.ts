import { Schema, model, models } from 'mongoose'
import {CommunityType, CommunityTypeList, PostType, UserActivityType} from "@components/constants/enums";


const userActivitySchema = new Schema({
  userId:             { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userActivityType:   { type: String, enum: Object.values(UserActivityType), required: true },
  postType:           { type: String, enum: Object.values(PostType), required: true },
  communityType:      { type: String, enum: Object.values(CommunityTypeList) },
  postId:             { type: Schema.Types.ObjectId, required: true },
  commentId:          { type: Schema.Types.ObjectId },
  replyId:            { type: Schema.Types.ObjectId },
  preview:            { type: String, required: true },
  createdAt:          { type: Date, required: true },
}, {toJSON: { virtuals: true}, toObject: { virtuals: true}})
userActivitySchema.virtual('id').get(function() {return this._id.toHexString()})

export const UserActivityModel = models.UserActivity || model("UserActivity", userActivitySchema)


export interface IUserActivity {
  id?:                string;
  userId:             string;
  userActivityType:   UserActivityType;
  postType:           PostType;
  communityType?:      CommunityType;
  postId:             string;
  commentId?:         string;
  replyId?:           string;
  preview:            string;
  createdAt:          string;
}

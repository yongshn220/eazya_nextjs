import { Schema, model, models } from 'mongoose'
import {UniversityIds} from "@components/constants/values";
import {PostType} from "@components/constants/enums";
import {CommentBase, CommentBaseSchema} from "@models/base/commentBase";
import {VoteUser, VoteUserBaseSchema} from "@models/base/voteUserBase";

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
  voteUsers:      { type: VoteUserBaseSchema, default: [], required: true },
  comments:       [CommentBaseSchema]
}, {toJSON: { virtuals: true}, toObject: { virtuals: true}})

EventPostSchema.virtual('id').get(function() {return this._id.toHexString()})

export const EventPostModel = models.EventPost || model("EventPost", EventPostSchema)

export interface EventPost {
  id?:          string;
  authorId:     string;
  universityId: string;
  type:         string;
  image:        string;
  title:        string;
  date:         string;
  time:         string;
  location:     string;
  description:  string;
  createdAt:    Date;
  outOfService: boolean;
  voteUsers:    VoteUser;
  comments:     Array<CommentBase>;
}
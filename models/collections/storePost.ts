import { Schema, model, models } from 'mongoose'
import {UniversityIds} from "@components/constants/values";
import {GeneralCommunityType, PostType, VoteType} from "@components/constants/enums";
import {VoteUser, VoteUserBaseSchema} from "@models/base/voteUserBase";
import {CommentBase, CommentBaseSchema} from "@models/base/commentBase";


const StorePostSchema = new Schema({
  authorId:       { type: Schema.Types.ObjectId, ref: 'User', required: true },
  universityId:   { type: String, enum: Object.values(UniversityIds), required: true, },
  type:           { type: String, enum: Object.values(PostType), required: true, },
  images:         [{ type: String, required: true }],
  title:          { type: String, required: true, },
  price:          { type: Number, required: true, default: 0 },
  description:    { type: String, required: true, },
  createdAt:      { type: Date, required: true, },
  outOfService:   { type: Boolean, required: true, default: false },
  voteUser:       { type: VoteUserBaseSchema, required: true },
  votes:          { type: Number, default: 0, required: true },
  commentators:   [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments:       [ CommentBaseSchema ]
}, {toJSON: { virtuals: true}, toObject: { virtuals: true}})
StorePostSchema.virtual('id').get(function() {return this._id.toHexString()})

export const StorePostModel = models.StorePost || model("StorePost", StorePostSchema)

export interface IStorePost {
  authorId:         string;
  universityId:     string;
  type:             PostType;
  images:           Array<string>;
  title:            string;
  price:            number;
  description:      string;
  createdAt:        string;
  outOfService:     boolean;
  voteUser:         VoteUser;
  votes:            number;
  myVoteType?:      VoteType;
  isMine?:          boolean;
  commentators:     Array<string>;
  comments:         Array<CommentBase>
}

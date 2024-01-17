import { Schema, model, models } from 'mongoose'
import {UniversityIds} from "@components/constants/values";
import {GeneralCommunityType, PostType, VoteType} from "@components/constants/enums";
import {VoteUser, VoteUserBaseSchema} from "@models/base/voteUserBase";
import {CommentBase, CommentBaseSchema} from "@models/base/commentBase";


const GeneralPostSchema = new Schema({
  authorId:       { type: Schema.Types.ObjectId, ref: 'User', required: true },
  universityId:   { type: String, enum: Object.values(UniversityIds), required: true, },
  type:           { type: String, enum: Object.values(PostType), required: true, },
  communityType:  { type: String, enum: Object.values(GeneralCommunityType), required: true },
  title:          { type: String, required: true, },
  description:    { type: String, required: true, },
  createdAt:      { type: Date, required: true, },
  outOfService:   { type: Boolean, required: true, },
  voteUser:       { type: VoteUserBaseSchema, required: true },
  votes:          { type: Number, default: 0, required: true },
  commentators:   [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments:       [ CommentBaseSchema ]
}, {toJSON: { virtuals: true}, toObject: { virtuals: true}})
GeneralPostSchema.virtual('id').get(function() {return this._id.toHexString()})

export const GeneralPostModel = models.GeneralPost || model("GeneralPost", GeneralPostSchema)

export interface IGeneralPost {
  id?:            string;
  authorId:       string;
  universityId:   string;
  type:           string;
  communityType:  string;
  title:          string;
  description:    string;
  createdAt:      Date;
  outOfService:   boolean;
  voteUser:       VoteUser;
  votes:          number;
  myVoteType?:    VoteType;
  isMine?:        boolean;
  commentators:   Array<string>;
  comments:       Array<CommentBase>;
}

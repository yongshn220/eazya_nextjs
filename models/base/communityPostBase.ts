
import { Schema } from 'mongoose'
import {MajorType, UniversityCode} from "@components/constants/values";
import {CommunityType, PostType, VoteType} from "@components/constants/enums";
import {VoteUser, VoteUserBaseSchema} from "@models/base/voteUserBase";
import {CommentBase, CommentBaseSchema} from "@models/base/commentBase";


export const CommunityPostBase = new Schema({
  universityCode:   { type: String, enum: Object.values(UniversityCode), required: true, },
  authorId:       { type: Schema.Types.ObjectId, ref: 'User', required: true },
  authorMajor:    { type: String, required: true, default: MajorType.NONE },
  type:           { type: String, enum: Object.values(PostType), required: true, },
  communityType:  { type: String, required: true },
  title:          { type: String, required: true, },
  description:    { type: String, required: true, },
  createdAt:      { type: Date, required: true, },
  outOfService:   { type: Boolean, required: true, },
  voteUser:       { type: VoteUserBaseSchema, required: true },
  votes:          { type: Number, default: 0, required: true },
  commentators:   [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments:       [ CommentBaseSchema ]
}, {toJSON: { virtuals: true}, toObject: { virtuals: true}})
CommunityPostBase.virtual('id').get(function() {return this._id.toHexString()})



export interface ICommunityBase {
  id?:            string;
  universityCode:   string;
  authorId:       string;
  authorMajor:    string;
  type:           string;
  communityType:  string;
  title:          string;
  description:    string;
  createdAt:      string;
  outOfService:   boolean;
  voteUser:       VoteUser;
  votes:          number;
  myVoteType?:    VoteType;
  isMine?:        boolean;
  commentators:   Array<string>;
  comments:       Array<CommentBase>;
}

import { Schema, Types } from "mongoose";
import {VoteUser, VoteUserBaseSchema} from "@models/base/voteUserBase";
import {VoteType} from "@components/constants/enums";
import {MajorType} from "@components/constants/values";


export const ReplyBaseSchema = new Schema({
  commentId:      { type: Schema.Types.ObjectId, required: true },
  authorId:       { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  authorName:     { type: String, required: true },
  authorMajor:    { type: String, required: true, default: MajorType.NONE},
  content:        { type: String, required: true },
  createdAt:      { type: Date, required: true },
  isSecret:       { type: Boolean, default: false, required: true },
  voteUser:       { type: VoteUserBaseSchema, required: true },
  votes:          { type: Number, default: 0, required: true  },
}, {toJSON: { virtuals: true}, toObject: { virtuals: true}})

ReplyBaseSchema.virtual('id').get(function() {return this._id.toHexString()})


export interface ReplyBase {
  id?:            string;
  postId:         string;
  commentId:      string;
  authorId:       string;
  authorName:     string;
  authorMajor:    string;
  content:        string;
  createdAt:      Date;
  isSecret:       boolean;
  voteUser:       VoteUser;
  votes:          number;
  myVoteType?:    VoteType;
  isMine?:        boolean;
}

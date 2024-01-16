import {Schema, Types} from 'mongoose'
import {ReplyBase, ReplyBaseSchema} from "@models/base/replyBase";
import {VoteUser, VoteUserBaseSchema} from "@models/base/voteUserBase";
import {VoteType} from "@components/constants/enums";

export const CommentBaseSchema = new Schema({
  authorId:     { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  authorName:   { type: String, required: true },
  content:      { type: String, required: true },
  createdAt:    { type: Date, required: true },
  isSecret:     { type: Boolean, default: false, required: true },
  voteUser:     { type: VoteUserBaseSchema, required: true },
  votes:        { type: Number, default: 0, required: true },
  replies:      [ReplyBaseSchema]
}, {toJSON: { virtuals: true}, toObject: { virtuals: true}})

CommentBaseSchema.virtual('id').get(function() {return this._id.toHexString()})

export interface CommentBase {
  id?:            string;
  postId:         string;
  authorId:       string;
  authorName:     string;
  content:        string;
  createdAt:      Date;
  isSecret:       boolean;
  voteUser:       VoteUser;
  votes:          number;
  myVoteType?:    VoteType;
  isMine?:        boolean;
  replies:        Array<ReplyBase>;
}

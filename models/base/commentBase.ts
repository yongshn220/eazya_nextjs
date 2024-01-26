import {Schema} from 'mongoose'
import {ReplyBase, ReplyBaseSchema} from "@models/base/replyBase";
import {VoteUser, VoteUserBaseSchema} from "@models/base/voteUserBase";
import {VoteType} from "@components/constants/enums";
import {MajorType} from "@components/constants/values";

export const CommentBaseSchema = new Schema({
  authorId:     { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  authorName:   { type: String, required: true },
  authorMajor:  { type: String, required: true, default: MajorType.NONE},
  content:      { type: String, required: true },
  createdAt:    { type: Date, required: true },
  isSecret:     { type: Boolean, default: false, required: true },
  voteUser:     { type: VoteUserBaseSchema, required: true },
  votes:        { type: Number, default: 0, required: true },
  replies:      [ReplyBaseSchema]
}, {toJSON: { virtuals: true}, toObject: { virtuals: true}})

CommentBaseSchema.virtual('id').get(function() {return this._id.toHexString()})

export interface CommentBase {
  id?:                      string;
  postId:                   string;
  authorId:                 string;     // hidden
  authorName:               string;     // anonymous name
  authorMajor:              string;
  content:                  string;
  createdAt:                string;
  isSecret:                 boolean;
  voteUser:                 VoteUser;
  votes:                    number;
  myVoteType?:              VoteType;
  isMine?:                  boolean;
  hasAuthorityToRead?:      boolean;
  replies:                  Array<ReplyBase>;
}

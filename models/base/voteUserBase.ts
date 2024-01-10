import {Schema, Types} from "mongoose";

export const VoteUserBaseSchema = new Schema({
  upvoted:      [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvoted:    [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {_id: false})

export interface VoteUser {
  upvoted:   Array<string>;
  downvoted: Array<string>;
}

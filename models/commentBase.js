import {Schema} from 'mongoose'

const CommentBaseSchema = new Schema({
  authorId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  authorName: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, required: true },
  isSecret: { type: Boolean, default: false, required: true },
  voteUsers: {
    upvoted: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvoted: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  replies:        [{
      _id:            { type: Schema.Types.ObjectId, required: true },
      authorId:       { type: Schema.Types.ObjectId, required: true, ref: 'User' },
      authorName:     { type: String, required: true },
      content:        { type: String, required: true },
      createdAt:      { type: Date, required: true },
      isSecret:       { type: Boolean, default: false, required: true },
      voteUsers:      {
        upvoted:        [{ type: Schema.Types.ObjectId, ref: 'User' }],
        downvoted:      [{ type: Schema.Types.ObjectId, ref: 'User' }]
      },
    }]
}, { discriminatorKey: "postType"})

export default CommentBaseSchema;

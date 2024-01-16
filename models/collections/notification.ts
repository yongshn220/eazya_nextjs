import { Schema, model, models } from 'mongoose'
import {NotificationType, PostType} from "@components/constants/enums";


const NotificationSchema = new Schema({
  fromUserId:         { type: Schema.Types.ObjectId, ref: 'User', required: true},
  toUserId:           { type: Schema.Types.ObjectId, ref: 'User', required: true},
  notificationType:   { type: String, enum: Object.values(NotificationType), required: true },
  postType:           { type: String, enum: Object.values(PostType), required: true },
  postId:             { type: Schema.Types.ObjectId, required: true },
  commentId:          { type: Schema.Types.ObjectId, required: false },
  replyId:            { type: Schema.Types.ObjectId, required: false },
  isRead:             { type: Boolean, default: false, required: true },
  createdAt:          { type: Date, required: true, },
}, {toJSON: { virtuals: true}, toObject: { virtuals: true}})

NotificationSchema.virtual('id').get(function() {return this._id.toHexString()})

export const NotificationModel = models.Notification || model("Notification", NotificationSchema)

export interface INotification {
  id?:                string;
  fromUserId:         string;
  toUserId:           string;
  notificationType:   NotificationType;
  postType:           PostType;
  postId:             string;
  postTitle?:         string;
  commentId?:         string;
  replyId?:           string;
  isRead:             boolean;
  createdAt:          string;
}

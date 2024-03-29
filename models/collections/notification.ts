import {model, models, Schema} from 'mongoose'
import {CommunityType, CommunityTypeList, NotificationType, PostType} from "@components/constants/enums";


const NotificationSchema = new Schema({
  fromUserId:         { type: Schema.Types.ObjectId, ref: 'User', required: true},
  toUserId:           { type: Schema.Types.ObjectId, ref: 'User', required: true},
  notificationType:   { type: String, enum: Object.values(NotificationType), required: true },
  postType:           { type: String, enum: Object.values(PostType), required: true },
  communityType:      { type: String, enum: Object.values(CommunityTypeList) },
  postId:             { type: Schema.Types.ObjectId, required: true },
  commentId:          { type: Schema.Types.ObjectId, required: false },
  replyId:            { type: Schema.Types.ObjectId, required: false },
  preview:            { type: String, required: true },
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
  communityType:      CommunityType;
  postId:             string;
  preview:            string;
  commentId?:         string;
  replyId?:           string;
  isRead:             boolean;
  createdAt:          string;
}

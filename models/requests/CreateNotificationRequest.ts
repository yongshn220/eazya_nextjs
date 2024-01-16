import {NotificationType, PostType} from "@components/constants/enums";


export interface CreateNotificationRequest {
  fromUserId:         string;
  toUserId:           string;
  notificationType:   NotificationType;
  postType:           PostType;
  postId:             string;
  commentId?:         string;
  replyId?:           string;
  preview:           string;
}

import {NotificationType, PostType} from "@components/constants/enums";

export interface DeleteNotificationRequest {
  fromUserId:         string;
  toUserId:           string;
  notificationType:   NotificationType;
  postType:           PostType;
  postId:             string;
  commentId?:         string;
  replyId?:           string;
}

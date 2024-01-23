import {CommunityType, NotificationType, PostType} from "@components/constants/enums";


export interface CreateNotificationRequest {
  fromUserId:         string;
  toUserId:           string;
  notificationType:   NotificationType;
  postType:           PostType;
  communityType?:      CommunityType;
  postId:             string;
  commentId?:         string;
  replyId?:           string;
  preview:            string;
}

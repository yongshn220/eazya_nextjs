import {CommunityType, PostType, UserActivityType} from "@components/constants/enums";

export interface CreateUserActivityRequest {
  userActivityType:   UserActivityType;
  postType:           PostType;
  communityType?:      CommunityType;
  postId:             string;
  commentId?:         string;
  replyId?:           string;
  preview:            string;
}

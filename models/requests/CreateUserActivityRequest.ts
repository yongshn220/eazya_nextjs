import {PostType, UserActivityType} from "@components/constants/enums";

export interface CreateUserActivityRequest {
  userActivityType:   UserActivityType;
  postType:           PostType;
  postId:             string;
  commentId?:         string;
  replyId?:           string;
  preview:            string;
}

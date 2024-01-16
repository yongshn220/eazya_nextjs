import {UserActivityType} from "@components/constants/enums";

export interface CreateUserActivityRequest {
  userActivityType:   UserActivityType;
  postId:             string;
  commentId?:         string;
  replyId?:           string;
}

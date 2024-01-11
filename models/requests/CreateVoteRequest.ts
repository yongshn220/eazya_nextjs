import {VoteType} from "@components/constants/enums";

export interface CreateVoteRequest {
  postType: string;
  postId: string;
  commentId?: string;
  replyId?: string;
  voteType: VoteType;
}


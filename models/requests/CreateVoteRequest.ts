import {PostType, VoteType} from "@components/constants/enums";

export interface CreateVoteRequest {
  postType: PostType;
  postId: string;
  commentId?: string;
  replyId?: string;
  voteType: VoteType;
}


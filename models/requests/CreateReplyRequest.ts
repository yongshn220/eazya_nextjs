import {PostType} from "@components/constants/enums";

export interface CreateReplyRequest {
    postType: PostType;
    postId: string;
    commentId: string;
    content: string;
    isSecret: boolean;
}

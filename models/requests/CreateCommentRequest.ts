import {PostType} from "@components/constants/enums";

export interface CreateCommentRequest {
    postType: PostType;
    postId: string;
    content: string;
    isSecret: boolean;
}


export interface CreateReplyRequest {
    postType: string;
    postId: string;
    commentId: string;
    content: string;
    isSecret: boolean;
}

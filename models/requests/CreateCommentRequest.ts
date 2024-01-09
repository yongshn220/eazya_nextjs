export interface CreateCommentRequest {
    postType: string;
    postId: string;
    content: string;
    isSecret: boolean;
}

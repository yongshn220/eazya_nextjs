import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CreateReplyRequest} from "@models/requests/CreateReplyRequest";
import {createReplyApi} from "@services/reply";
import {eventPostKey} from "@services/eventPost";
import {EventPost} from "@models/eventPost";


export default function useCreateReply() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (req: CreateReplyRequest) => createReplyApi(req),
    onSuccess: (newReply) => {
      queryClient.setQueryData([eventPostKey.getEventPostApi, newReply.postId], (prevPost: EventPost) => {
        const updatedPost = { ...prevPost };

        const commentIndex = updatedPost.comments.findIndex((comment) => comment.id === newReply.commentId);
        if (commentIndex === -1) return; // Comment not found, can't add reply

        if (!updatedPost.comments[commentIndex].replies) {
          updatedPost.comments[commentIndex].replies = [];
        }

        updatedPost.comments[commentIndex].replies.push(newReply);
        return updatedPost;
      })
    }
  })
}

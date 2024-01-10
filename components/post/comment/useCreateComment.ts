import {useMutation, useQueryClient} from "@tanstack/react-query"
import {eventPostKey} from "@services/eventPost";
import {CreateCommentRequest} from "@models/requests/CreateCommentRequest";
import {createCommentApi} from "@services/comment";
import {EventPost} from "@models/eventPost";

export default function useCreateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (req: CreateCommentRequest) => createCommentApi(req),
    onSuccess: (newComment) => {
      queryClient.setQueryData([eventPostKey.getEventPostApi, newComment.postId], (prevPost: EventPost) => {
        if (!prevPost.comments) prevPost.comments = [];
        console.log([...prevPost.comments, newComment])
        return {
          ...prevPost,
          comments: [...prevPost.comments, newComment]
        }
      })
    }
  })
}


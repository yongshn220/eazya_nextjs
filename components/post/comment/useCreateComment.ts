import {useMutation, useQueryClient} from "@tanstack/react-query"
import {eventPostKey} from "@services/eventPost";
import {CreateCommentRequest} from "@models/requests/CreateCommentRequest";
import {createCommentApi} from "@services/comment";


export default function useCreateComment(postId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (req: CreateCommentRequest) => createCommentApi(req),
    onSuccess: (newComment) => {
      queryClient.setQueryData([eventPostKey.getEventPostApi, postId], (prevPost: any) => {
        if (!prevPost.comments) {
          prevPost.comments = [];
        }

        return {
          ...prevPost,
          comments: [...prevPost.comments, newComment]
        };
      })
    }
  })
}

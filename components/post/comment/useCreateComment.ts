import {useMutation, useQueryClient} from "@tanstack/react-query"
import {eventPostKey} from "@services/eventPost";
import {CreateCommentRequest} from "@models/requests/CreateCommentRequest";
import {createCommentApi} from "@services/comment";

export default function useCreateComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (req: CreateCommentRequest) => createCommentApi(req),
    onSuccess: (newComment) => {
      queryClient.invalidateQueries({queryKey: [eventPostKey.getEventPostApi, newComment.postId]})
    }
  })
}


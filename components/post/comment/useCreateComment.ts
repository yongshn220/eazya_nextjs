import {useMutation, useQueryClient} from "@tanstack/react-query"
import {eventPostKey} from "@services/eventPost";
import {CreateCommentRequest} from "@models/requests/CreateCommentRequest";
import {createCommentApi} from "@services/comment";


export default function useCreateComment(postType: string, postId: string, content: string, isSecret: boolean) {
  const queryClient = useQueryClient()
  const req: CreateCommentRequest = {postType, postId, content, isSecret}

  return useMutation({
    mutationFn: () => createCommentApi(req),
    onSuccess: (newComment) => {
      queryClient.setQueryData([eventPostKey.getEventPostApi, postId], (prevPost: Object) => {
        const newPost:any = { ...prevPost }
        newPost.comments = [...newPost.comments, newComment]
        return newPost
      })
    }
  })
}

import {useMutation, useQueryClient} from "@tanstack/react-query"
import {createCommentApi} from "@services/comment";
import {eventPostKey} from "@services/eventPost";


export default function useCreateComment(postType, postId, content, isSecret) {
  const queryClient = useQueryClient()
  const req = {
    postType,
    postId,
    content,
    isSecret
  }

  return useMutation({
    mutationFn: () => createCommentApi(req),
    onSuccess: (newComment) => {
      queryClient.setQueryData([eventPostKey.getEventPostApi, postId], (prevPost) => {
        const newPost = { ...prevPost }
        newPost.comments = [...newPost.comments, newComment]
        return newPost
      })
    }
  })
}

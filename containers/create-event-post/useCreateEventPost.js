import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEventPostApi, eventPostKey} from "@services/eventPost";


export default function useCreateEventPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (post) => createEventPostApi(post),
    onSuccess: (newPost) => {
      queryClient.setQueryData([eventPostKey.getEventPostApi, newPost.id], newPost)
      queryClient.invalidateQueries({
        queryKey: [eventPostKey.getEventPostIdsApi, 1]
      })
    }
  })
}

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEventPostApi} from "@services/eventPost";


export default function useCreateEventPost() {
  const queryClient = useQueryClient()

  const postEventMutation = useMutation({
    mutationFn: (post) => createEventPostApi(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getEventPostsApi", 1]
      })
    }
  })

  return {postEventMutation}
}

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteEventPostApi, eventPostKey} from "@services/eventPost";


export default function useDeleteEventPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => deleteEventPostApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [eventPostKey.getEventPostIdsApi]
      })
    }
  })
}

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
      queryClient.invalidateQueries({queryKey: [eventPostKey.getEventPostApi, newReply.postId]})
    }
  })
}

import { useQuery } from '@tanstack/react-query'
import { eventPostKey, getEventPostApi } from "@services/eventPost";

export default function useEventPost(id) {
  const {data, isLoading} = useQuery({
    queryKey: [eventPostKey.getEventPostApi, id],
    queryFn: () => getEventPostApi(id),
  })

  return {
    post: data,
    isLoading,
  }
}

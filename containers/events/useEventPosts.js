import { useQuery } from '@tanstack/react-query'
import { getEventPostsApi } from "@services/eventPost";
import {useState} from "react";

export default function useEventPosts() {
  const [page, setPage] = useState(1)

  const {data, isLoading} = useQuery({
    queryKey: ['getEventPostsApi', page],
    queryFn: () => getEventPostsApi(page),
    staleTime: 30 * 1000,
    keepPreviousData : true,
  })

  return {
    page,
    setPage,
    data,
    isLoading,
  }
}

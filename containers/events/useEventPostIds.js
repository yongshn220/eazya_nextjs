"use client"

import { useQuery } from '@tanstack/react-query'
import {eventPostKey, getEventPostIdsApi} from "@services/eventPost";
import {useState} from "react";

export default function useEventPostIds() {
  const [page, setPage] = useState(1)

  const {data, isLoading} = useQuery({
    queryKey: [eventPostKey.getEventPostIdsApi, page],
    queryFn: () => getEventPostIdsApi(page),
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

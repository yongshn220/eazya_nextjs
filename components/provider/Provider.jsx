"use client"

import { SessionProvider } from 'next-auth/react'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from "react"
import { RecoilRoot } from 'recoil'

export default function Provider({ children, session }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RecoilRoot>
          {children}
        </RecoilRoot>
      </QueryClientProvider>
    </SessionProvider>
  )
}

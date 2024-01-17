'use client'

import CreateGeneralPost from "@containers/create-general-post";
import { useSearchParams } from 'next/navigation'


export default function CreateGeneralPostHome() {
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')

  return (
    <CreateGeneralPost tag={tag}/>
  )
}

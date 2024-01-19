'use client'

import CreateGeneralPost from "@containers/create-general-post";
import { useSearchParams } from 'next/navigation'
import {CommunityType} from "@components/constants/enums";


export default function CreateGeneralPostHome() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') as CommunityType

  if (!type || !Object.values(CommunityType).includes(type)) {
    return (<div>Something went wrong.</div>);
  }

  return (
    <CreateGeneralPost type={type}/>
  )
}

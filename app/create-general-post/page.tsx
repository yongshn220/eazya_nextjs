'use client'

import CreateGeneralPost from "@containers/create-general-post";
import { useSearchParams } from 'next/navigation'
import {GeneralCommunityType} from "@components/constants/enums";


export default function CreateGeneralPostHome() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') as GeneralCommunityType

  if (!type || !Object.values(GeneralCommunityType).includes(type)) {
    return (<div>Something went wrong.</div>);
  }

  return (
    <CreateGeneralPost type={type}/>
  )
}

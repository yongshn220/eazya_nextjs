'use client'

import { useSearchParams } from 'next/navigation'
import {CommunityType, PostType} from "@components/constants/enums";
import CreateCommunityPost from "@components/post/community/CreateCommunityPost";


export default function CreateFindMemberPostHome() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') as CommunityType

  if (!type || !Object.values(CommunityType).includes(type)) {
    return (<div>Something went wrong.</div>);
  }

  return (
    <CreateCommunityPost postType={PostType.FIND_MEMBER} communityType={type}/>
  )
}

'use client'

import { useSearchParams } from 'next/navigation'
import {CommunityType, PostType, StudentGroupType} from "@components/constants/enums";
import CreateCommunityPost from "@components/post/community/CreateCommunityPost";


export default function CreateGeneralPostHome() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') as StudentGroupType
  const communityList = Object.values(StudentGroupType)

  if (!type || !communityList.includes(type)) {
    return (<div>Something went wrong.</div>);
  }

  return (
    <CreateCommunityPost postType={PostType.GENERAL} communityType={type} communityList={communityList}/>
  )
}

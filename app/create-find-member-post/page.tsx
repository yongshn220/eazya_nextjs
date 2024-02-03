'use client'

import { useSearchParams } from 'next/navigation'
import {CommunityType, PostType, StudentGroupType} from "@components/constants/enums";
import CreateCommunityPost from "@components/post/community/CreateCommunityPost";


export default function CreateFindMemberPostHome() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') as StudentGroupType
  const communityList = Object.values(StudentGroupType)

  if (!type || !communityList.includes(type)) {
    return (<div>Something went wrong.</div>);
  }

  return (
    <CreateCommunityPost postType={PostType.FIND_MEMBER} communityType={type} communityList={communityList}/>
  )
}

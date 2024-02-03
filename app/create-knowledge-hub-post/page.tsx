'use client'

import { useSearchParams } from 'next/navigation'
import {CommunityType, KnowledgeType, PostType, StudentGroupType} from "@components/constants/enums";
import CreateCommunityPost from "@components/post/community/CreateCommunityPost";


export default function CreateKnowledgeHubPostHome() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type') as KnowledgeType
  const communityList = Object.values(KnowledgeType)

  if (!type || !communityList.includes(type)) {
    return (<div>Something went wrong.</div>);
  }

  return (
    <CreateCommunityPost postType={PostType.KNOWLEDGE_HUB} communityType={type} communityList={communityList}/>
  )
}

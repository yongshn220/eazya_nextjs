import {KnowledgeType, PostType, StudentGroupType} from "@components/constants/enums";
import EditCommunityPost from "@components/post/community/EditCommunityPost";
import getCommunityPostAction from "@actions/community/getCommunityPostAction";


export default async function EditKnowledgeHubPostHome({params}) {
  const postId = params.id
  const post = await getCommunityPostAction(postId, PostType.KNOWLEDGE_HUB)

  return (
    <EditCommunityPost post={post} communityList={Object.values(KnowledgeType)}/>
  )
}

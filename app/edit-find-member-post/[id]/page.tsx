import getCommunityPostAction from "@actions/community/getCommunityPostAction";
import {PostType, StudentGroupType} from "@components/constants/enums";
import EditCommunityPost from "@components/post/community/EditCommunityPost";


export default async function EditFindMemberPostPage({params}) {
  const postId = params.id
  const post = await getCommunityPostAction(postId, PostType.FIND_MEMBER)

  return (
    <EditCommunityPost post={post} communityList={Object.values(StudentGroupType)}/>
  )
}

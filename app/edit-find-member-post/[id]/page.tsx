import getCommunityPostAction from "@actions/community/getCommunityPostAction";
import {PostType} from "@components/constants/enums";
import EditCommunityPost from "@components/post/community/EditCommunityPost";


export default async function EditFindMemberPostPage({params}) {
  const postId = params.id
  const post = await getCommunityPostAction(PostType.FIND_MEMBER, postId)

  return (
    <EditCommunityPost post={post}/>
  )
}

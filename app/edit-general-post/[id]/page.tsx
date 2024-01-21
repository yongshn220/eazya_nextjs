import {PostType} from "@components/constants/enums";
import EditCommunityPost from "@components/post/community/EditCommunityPost";
import getCommunityPostAction from "@actions/community/getCommunityPostAction";


export default async function EditGeneralPostHome({params}) {
  const postId = params.id
  const post = await getCommunityPostAction(postId, PostType.GENERAL)

  return (
    <EditCommunityPost post={post}/>
  )
}

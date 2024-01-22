import {PostType} from "@components/constants/enums";
import CommunityPost from "@components/post/community/CommunityPost";

export default function GeneralPostPage({ params }) {
  const communityType = params.type
  const postId = params.id

  return (
    <CommunityPost postType={PostType.GENERAL} communityType={communityType} postId={postId}/>
  )
}
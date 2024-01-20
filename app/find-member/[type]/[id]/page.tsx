import {PostType} from "@components/constants/enums";
import CommunityPost from "@components/post/community/CommunityPost";

export default function FindMemberPostPage({ params }) {
  const communityType = params.type
  const postId = params.id

  return (
    <CommunityPost postType={PostType.FIND_MEMBER} communityType={communityType} postId={postId}/>
  )
}

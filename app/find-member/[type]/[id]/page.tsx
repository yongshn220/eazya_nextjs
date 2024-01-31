import {PostType} from "@components/constants/enums";
import CommunityPost from "@components/post/community/CommunityPost";
import {Metadata, ResolvingMetadata} from "@node_modules/next";
import {ICommunityPost} from "@models/union/union";
import getCommunityPostAction from "@actions/community/getCommunityPostAction";


export async function generateMetadata({ params }, parent: ResolvingMetadata): Promise<Metadata> {
  const communityType = params.type
  const postId = params.id
  const post: ICommunityPost  = await getCommunityPostAction(communityType, postId)
  if (!post) return {}

  const baseTitle = "Community Find Member - ";
  const baseDescription = "Learn more about our community: ";

  return {
    title: baseTitle + post.title,
    description: baseDescription + post.description,
  }
}

export default function FindMemberPostPage({ params }) {
  const communityType = params.type
  const postId = params.id

  return (
    <CommunityPost postType={PostType.FIND_MEMBER} communityType={communityType} postId={postId}/>
  )
}

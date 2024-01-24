import {PostType} from "@components/constants/enums";
import CommunityPost from "@components/post/community/CommunityPost";
import {Metadata, ResolvingMetadata} from "@node_modules/next";
import getCommunityPostAction from "@actions/community/getCommunityPostAction";
import {ICommunityPost} from "@models/union/union";


export async function generateMetadata({ params }, parent: ResolvingMetadata): Promise<Metadata> {
  const communityType = params.type
  const postId = params.id
  const post: ICommunityPost  = await getCommunityPostAction(postId, communityType)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
  }
}


export default function GeneralPostPage({ params }) {
  const communityType = params.type
  const postId = params.id

  return (
    <CommunityPost postType={PostType.GENERAL} communityType={communityType} postId={postId}/>
  )
}

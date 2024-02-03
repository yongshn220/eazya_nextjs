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

  const baseTitle = "Community Post - ";
  const baseDescription = "Learn more about our community: ";

  return {
    title: baseTitle + post.title,
    description: baseDescription + post.description,
  }
}


export default function KnowledgeHubPostPage({ params }) {
  const communityType = params.type
  const postId = params.id

  return (
    <CommunityPost postType={PostType.KNOWLEDGE_HUB} communityType={communityType} postId={postId}/>
  )
}

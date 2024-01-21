import getCommunityPostIdsAction from "@actions/community/getCommunityPostIdsAction";
import CommunityDetailPostItem from "@components/post/community/CommunityDetailPostItem";
import getCommunityPostAction from "@actions/community/getCommunityPostAction";
import {ICommunityPost} from "@models/union/union";
import CommunityPostLoadMore from "@components/post/community/CommunityPostLoadMore";

export default async function CommunityPosts({postType, communityType}) {
  const postIds = await getCommunityPostIdsAction(postType, communityType, 1)
  const posts = []
  for (const id of postIds) {
    const post = await getCommunityPostAction(id, postType) as ICommunityPost
    if (!post) continue
    posts.push(post)
  }

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-300 border-t border-gray-300 ">
        {
          posts.map(post => (
            <CommunityDetailPostItem key={post.id} postType={postType} communityType={communityType} post={post}/>
          ))
        }
      </ul>
      <CommunityPostLoadMore postType={postType} communityType={communityType}/>
    </div>
  )
}

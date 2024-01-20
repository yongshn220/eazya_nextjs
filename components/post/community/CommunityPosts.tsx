import getCommunityPostIdsAction from "@actions/community/getCommunityPostIdsAction";
import CommunityDetailPostItem from "@components/post/community/CommunityDetailPostItem";

export default async function CommunityPosts({postType, communityType}) {
  const postIds = await getCommunityPostIdsAction(postType, communityType)

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-300 border-t border-gray-300 ">
        {
          postIds.map((id: string) => (
            <CommunityDetailPostItem key={id} postType={postType} communityType={communityType} postId={id}/>
          ))
        }
      </ul>
    </div>
  )
}

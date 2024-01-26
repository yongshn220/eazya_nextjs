import Link from 'next/link'
import getCommunityPostIdsAction from "@actions/community/getCommunityPostIdsAction";
import {CommunityType, PostType} from "@components/constants/enums";
import {getCommunityHomePath} from "@components/constants/tags";
import CommunityPostItem from "@components/post/community/CommunityPostItem";
import getCommunityPostAction from "@actions/community/getCommunityPostAction";
import {ICommunityPost} from "@models/union/union";


const DEFAULT_COMMUNITY_TYPE = CommunityType.EVERYONE

export default async function FindMemberPreview() {
  const postIds = await getCommunityPostIdsAction(PostType.FIND_MEMBER, DEFAULT_COMMUNITY_TYPE, 1)

  const posts = []
  for (const id of postIds) {
    const post = await getCommunityPostAction(id, PostType.FIND_MEMBER) as ICommunityPost
    if (!post) continue

    posts.push(post)
  }


  return (
    <div className="relative">
      <Link href={getCommunityHomePath(PostType.FIND_MEMBER, DEFAULT_COMMUNITY_TYPE)}>
        <div className="glass_box cursor-pointer group">
          <p className={`text-md font-semibold hover_text_blue`}>Find Member</p>
        </div>
      </Link>

      <ul role="list" className="divide-y divide-gray-300 border-b">
        {
          // posts.slice(0, 5).map((post) => (
          //   <CommunityPostItem key={post.id} postType={PostType.FIND_MEMBER} communityType={DEFAULT_COMMUNITY_TYPE} post={post}/>
          // ))
        }
      </ul>
    </div>
  )
}

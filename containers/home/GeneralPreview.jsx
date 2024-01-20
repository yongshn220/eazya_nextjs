import Link from 'next/link'
import getCommunityPostIdsAction from "@actions/community/getCommunityPostIdsAction";
import {CommunityType, PostType} from "@components/constants/enums";
import {getCommunityHomePath} from "@components/constants/tags";
import CommunityPostItem from "@components/post/community/CommunityPostItem";

const DEFAULT_COMMUNITY_TYPE = CommunityType.ENGLISH

export default async function GeneralPreview() {
  const postIds = await getCommunityPostIdsAction(PostType.GENERAL, DEFAULT_COMMUNITY_TYPE)

  return (
    <div className="relative">
      <Link href={getCommunityHomePath(PostType.GENERAL, DEFAULT_COMMUNITY_TYPE)}>
        <div className="glass_box cursor-pointer group">
          <p className={`text-md font-semibold hover_text_blue`}>General</p>
        </div>
      </Link>

      <ul role="list" className="divide-y divide-gray-300 border-b">
        {
          postIds.slice(0, 5).map((id) => (
            <CommunityPostItem key={id} postType={PostType.GENERAL} communityType={DEFAULT_COMMUNITY_TYPE} postId={id}/>
          ))
        }
      </ul>
    </div>
  )
}

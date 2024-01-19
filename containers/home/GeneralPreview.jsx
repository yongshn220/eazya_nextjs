import GeneralPostItem from "@containers/general/PostItem";
import Link from 'next/link'
import {hoveredTextColor} from "@components/constants/values";
import getCommunityPostIdsAction from "@actions/community/getCommunityPostIdsAction";
import {CommunityType} from "@components/constants/enums";

const DEFAULT_COMMUNITY_TYPE = CommunityType.ENGLISH
export default async function GeneralPreview() {
  const generalPostIds = await getCommunityPostIdsAction(DEFAULT_COMMUNITY_TYPE)

  return (
    <div className="relative">
      <Link href="/general/English">
        <div className="glass_box cursor-pointer group">
          <p className={`text-md font-semibold hover_text_blue`}>General</p>
        </div>
      </Link>

      <ul role="list" className="divide-y divide-gray-300 border-b">
        {
          generalPostIds.slice(0, 5).map((id) => (
            <GeneralPostItem key={id} id={id} type={DEFAULT_COMMUNITY_TYPE}/>
          ))
        }
      </ul>
    </div>
  )
}

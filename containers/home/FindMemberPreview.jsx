import GeneralPostItem from "@containers/general/PostItem";
import Link from 'next/link'
import {hoveredTextColor} from "@components/constants/values";
import getCommunityPostIdsAction from "@actions/community/getCommunityPostIdsAction";
import {CommunityType} from "@components/constants/enums";

export default async function FindMemberPreview({type}) {
  // TODO
  const generalPostIds = await getCommunityPostIdsAction(CommunityType.ENGLISH)

  return (
    <div className="relative">
      <Link href="/general/English">
        <div className="glass_box cursor-pointer group">
          <p className={`text-md font-semibold hover_text_blue`}>{type}</p>
        </div>
      </Link>

      <ul role="list" className="divide-y divide-gray-300 border-b">
        {
          generalPostIds.slice(0, 5).map((id) => (
            <GeneralPostItem id={id}/>
          ))
        }
      </ul>
    </div>
  )
}

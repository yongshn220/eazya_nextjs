import GeneralPostItem from "@containers/general/PostItem";
import Link from 'next/link'
import {hoveredTextColor} from "@components/constants/values";
import getGeneralPostIdsAction from "@actions/general/getGeneralPostIdsAction";
import {GeneralCommunityType} from "@components/constants/enums";

const DEFAULT_COMMUNITY_TYPE = GeneralCommunityType.ENGLISH
export default async function GeneralPreview() {
  const generalPostIds = await getGeneralPostIdsAction(DEFAULT_COMMUNITY_TYPE)

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

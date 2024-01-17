import GeneralPostItem from "@containers/general/PostItem";
import Link from 'next/link'
import {hoveredTextColor} from "@components/constants/values";

export default function CommunityPreview({type}) {
  return (
    <div className="relative">
      <Link href="/general/type/English">
        <div className="glass_box cursor-pointer group">
          <p className={`text-md font-semibold hover_text_blue`}>{type}</p>
        </div>
      </Link>

      <ul role="list" className="divide-y divide-gray-300">
        <GeneralPostItem id={1}/>
        <GeneralPostItem id={1}/>
        <GeneralPostItem id={1}/>
        <GeneralPostItem id={1}/>
        <GeneralPostItem id={1}/>
      </ul>
    </div>
  )
}

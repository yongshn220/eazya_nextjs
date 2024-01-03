import TextPostItem from "@components/postItems/TextPostItem";
import Link from 'next/link'
import {hoveredTextColor} from "@components/constants/values";

export default function CommunityPreview({type}) {
  return (
    <div className="relative">
      <Link href="/general">
        <div className="glass_box cursor-pointer group">
          <p className={`text-md font-semibold group-hover:${hoveredTextColor}`}>{type}</p>
        </div>
      </Link>

      <ul role="list" className="divide-y divide-gray-300">
        <TextPostItem id={1}/>
        <TextPostItem id={1}/>
        <TextPostItem id={1}/>
        <TextPostItem id={1}/>
        <TextPostItem id={1}/>
      </ul>
    </div>
  )
}

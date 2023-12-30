import TextPostItem from "@components/contents/TextPostItem";
import Link from 'next/link'

export default function CommunityPreview({type}) {
  return (
    <div className="group relative">
      <Link href="/general">
        <div className="glass_box cursor-pointer group">
          <p className="text-md font-semibold group-hover:text-blue-500">{type}</p>
        </div>
      </Link>

      <ul role="list" className="divide-y divide-gray-300">
        <TextPostItem/>
        <TextPostItem/>
        <TextPostItem/>
        <TextPostItem/>
        <TextPostItem/>
      </ul>
    </div>
  )
}

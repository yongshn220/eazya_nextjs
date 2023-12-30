import TextPost from "@components/contentItems/TextPost";
import Link from 'next/link'

export default function CommunityPreview({type}) {
  return (
    <div className="group relative">
      <Link href="/general">
        <div className="glass_box cursor-pointer group-hover:text-blue-500">
          <p className="text-md font-semibold">{type}</p>
        </div>
      </Link>

      <ul role="list" className="divide-y">
        <TextPost/>
        <TextPost/>
        <TextPost/>
        <TextPost/>
        <TextPost/>
      </ul>
    </div>
  )
}

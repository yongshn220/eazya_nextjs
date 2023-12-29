import TextPost from "@components/contentItems/TextPost";

export default function CommunityPreview({type}) {
  return (
    <div className="group relative">
      <div className="glass_box">
        <p className="text-md font-semibold text-gray-500 ">{type}</p>
      </div>

      <ul role="list" class="divide-y divide-gray-100">
        <TextPost/>
        <TextPost/>
        <TextPost/>
        <TextPost/>
        <TextPost/>
      </ul>
    </div>
  )
}

import Image from 'next/image'
import InfoHeader from "@components/headers/InfoHeader";

export default function Comment({comment}) {
  return (
    <div className="flex flex-col py-5 gap-4 border-b">
      <InfoHeader/>
      <p className="text-sm leading-6 text-gray-900">{comment.content}</p>
      <p className="text-xs leading-5 text-gray-500 cursor-pointer">Reply</p>
    </div>
  )
}

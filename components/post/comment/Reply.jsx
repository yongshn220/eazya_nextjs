import InfoHeader from "@components/headers/InfoHeader";

export default function Reply({reply}) {
  return (
    <div className="flex flex-col py-5 gap-4">
      <InfoHeader author={reply.authorName} date={reply.date}/>
      <p className="text-sm leading-6 text-gray-900">{reply.content}</p>
    </div>
  )
}

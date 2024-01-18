import {IGeneralPost} from "@models/collections/generalPost";

export default function GeneralContent({post}: {post: IGeneralPost}) {
  return (
    <section className="w-full flex-start flex-col gap-10 mt-4 pb-20 border-b border-gray-300">
      <p className="text-2xl font-bold">{post.title}</p>
      <p className="whitespace-pre-wrap">{post.description}</p>
    </section>
  )
}

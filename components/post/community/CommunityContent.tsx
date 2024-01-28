import {ICommunityPost} from "@models/union/union";
import TextLink from "@components/util/TextLink";

export default function CommunityContent({post}: {post: ICommunityPost}) {
  return (
    <section className="w-full flex-start flex-col gap-10 mt-4 pb-20 border-b border-gray-300">
      <p className="text-2xl font-bold">{post.title}</p>
      <p className="whitespace-pre-wrap break-all"><TextLink>{post.description}</TextLink></p>
    </section>
  )
}

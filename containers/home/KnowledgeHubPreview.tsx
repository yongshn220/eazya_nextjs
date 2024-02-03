import Link from 'next/link'
import getCommunityPostIdsAction from "@actions/community/getCommunityPostIdsAction";
import {BaseType, CommunityType, KnowledgeType, PostType} from "@components/constants/enums";
import {getCommunityHomePath} from "@components/constants/tags";
import CommunityPostItem from "@components/post/community/CommunityPostItem";
import getCommunityPostAction from "@actions/community/getCommunityPostAction";
import {ICommunityPost} from "@models/union/union";
import Image from "@node_modules/next/image";

const DEFAULT_COMMUNITY_TYPE = KnowledgeType.PROGRAMMING

export default async function KnowledgeHubPreview({maxItemLength}) {
  const postIds = await getCommunityPostIdsAction(PostType.KNOWLEDGE_HUB, BaseType.ALL, 1)

  const posts = []
  for (const id of postIds) {
    const post = await getCommunityPostAction(id, PostType.KNOWLEDGE_HUB) as ICommunityPost
    if (post) {
      posts.push(post)
    }
  }


  return (
    <div className="relative">
      <Link href={getCommunityHomePath(PostType.KNOWLEDGE_HUB, DEFAULT_COMMUNITY_TYPE)}>
        <div className="relative p-2 h-8 rounded-lg flex-center cursor-pointer group">
          <Image
            src={"/assets/images/title_background.png"}
            fill
            sizes="20vw"
            className="w-full object-cover rounded-md opacity-50"
            alt="1"
          />
          <p className={`absolute text-lg font-semibold hover_text_blue`}>Knowledge Hub</p>
        </div>
      </Link>

      <ul role="list" className="divide-y divide-gray-300 border-b">
        {
          posts.slice(0, maxItemLength).map((post) => (
            <CommunityPostItem key={post.id} postType={PostType.KNOWLEDGE_HUB} communityType={DEFAULT_COMMUNITY_TYPE}
                               post={post}/>
          ))
        }
      </ul>
    </div>
  )
}

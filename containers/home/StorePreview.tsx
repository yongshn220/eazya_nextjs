import StorePostItem from "@containers/store/StorePostItem";
import Link from 'next/link'
import getStorePostIdsAction from "@actions/store/getStorePostIdsAction";
import getStorePostAction from "@actions/store/getStorePostAction";
import {IStorePost} from "@models/collections/storePost";
import {getHomePath} from "@components/constants/tags";
import {PostType} from "@components/constants/enums";

export default async function StorePreview() {
  const postIds = await getStorePostIdsAction(1)
  const posts = []
  for (const id of postIds) {
    const post = await getStorePostAction(id) as IStorePost
    if (!post) continue

    posts.push(post)
  }
  return (
    <section className="w-full flex-col px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <Link href={getHomePath(PostType.STORE)}>
        <div className="flex flex-col border-s-4 group cursor-pointer">
          <h1 className={`mx-4 font-satoshi text-xl font-bold text-gray-900 hover_text_blue`}>Buy & Sell</h1>
          <p className="mx-4 font-satoshi text-md text-gray-500">Second-hand market</p>
        </div>
      </Link>

      <div className="grid_preview_image">
        {
          posts.slice(0, 4).map((post) => (
            <StorePostItem key={post.id} post={post}/>
          ))
        }
      </div>
    </section>
  )
}

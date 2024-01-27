import StorePostItem from "@containers/store/StorePostItem";
import Link from 'next/link'
import getStorePostIdsAction from "@actions/store/getStorePostIdsAction";
import getStorePostAction from "@actions/store/getStorePostAction";
import {IStorePost} from "@models/collections/storePost";
import {getHomePath} from "@components/constants/tags";
import {PostType} from "@components/constants/enums";
import Image from "@node_modules/next/image";

export default async function StorePreview() {
  const postIds = await getStorePostIdsAction(1)
  const posts = []
  for (const id of postIds) {
    const post = await getStorePostAction(id) as IStorePost
    if (!post) continue

    posts.push(post)
  }
  return (
    <section className="w-full flex-col px-4 sm:px-6 lg:max-w-7xl lg:px-8 ">
      <Link href={getHomePath(PostType.STORE)}>
        <div className="relative p-2 h-8 rounded-lg flex-center cursor-pointer group">
          <Image
            src={"/assets/images/title_background.png"}
            fill
            sizes="100vw"
            className="w-full object-cover rounded-md opacity-600"
            alt="1"
          />
          <p className={`absolute text-lg font-semibold hover_text_blue`}>Buy & Sell</p>
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

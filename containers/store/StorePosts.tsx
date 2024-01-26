import StorePostItem from "@containers/store/StorePostItem";
import getStorePostIdsAction from "@actions/store/getStorePostIdsAction";
import getStorePostAction from "@actions/store/getStorePostAction";
import {IStorePost} from "@models/collections/storePost";
import StorePostLoadMore from "@containers/store/StorePostLoadMore";

export default async function StorePosts() {
  const postIds = await getStorePostIdsAction(1)
  const posts = []
  for (const id of postIds) {
    const post = await getStorePostAction(id) as IStorePost
    if (!post) continue

    posts.push(post)
  }

  return (
    <section>
      <div className="grid_image">
        {
          posts.map(post => (
            <StorePostItem key={post.id} post={post}/>
          ))
        }
      </div>
      <StorePostLoadMore/>
    </section>
  )
}

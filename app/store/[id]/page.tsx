import StorePost from "@containers/store/id/StorePost";
import {Metadata, ResolvingMetadata} from "@node_modules/next";
import getStorePostAction from "@actions/store/getStorePostAction";
import {IStorePost} from "@models/collections/storePost";


export async function generateMetadata({ params }, parent: ResolvingMetadata): Promise<Metadata> {
  const postId = params.id
  const post: IStorePost  = await getStorePostAction(postId)
  if (!post) return {}

  return {
    title: `For Sale: ${post.title} - University Buy and Sell`,
    description: post.description || 'Check out this great item for sale at the University Buy and Sell. Find textbooks, electronics, and more!',
  }
}

export default function StorePostPage({ params }) {
  const postId = params.id

  return (
    <StorePost id={postId}/>
  )
}

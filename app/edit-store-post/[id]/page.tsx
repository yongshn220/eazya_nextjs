import EditStorePost from "@containers/edit-store-post";
import getStorePostAction from "@actions/store/getStorePostAction";


export default async function EditStorePostHome({params}) {
  const postId = params.id
  const post = await getStorePostAction(postId)

  return (
    <EditStorePost post={post}/>
  )
}

import EditEventPost from "@containers/edit-event-post";
import getEventPostAction from "@actions/event/getEventPostAction";


export default async function EditEventPostPage({params}) {
  const postId = params.id
  const post = await getEventPostAction(postId)

  return (
    <EditEventPost post={post}/>
  )
}

import EditEventPost from "@containers/edit-event-post";


export default function EditEventPostPage({params}) {
  const postId = params.get('id')

  return (
    <EditEventPost postId={postId}/>
  )
}

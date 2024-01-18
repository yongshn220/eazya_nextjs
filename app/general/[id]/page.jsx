import GeneralPost from "@containers/general/id/GeneralPost";

export default function GeneralPostPage({ params }) {
  const postId = params.id

  return (
    <GeneralPost id={postId}/>
  )
}

import Store from '@containers/store'
export default function StoreHome({ params }) {
  const postId = params.id

  return (
    <Store id={postId}/>
  )
}

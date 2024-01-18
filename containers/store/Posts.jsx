import StorePostItem from "@containers/store/StorePostItem";
import getStorePostIdsAction from "@actions/store/getStorePostIdsAction";

export default async function StorePosts() {
  const postIds = await getStorePostIdsAction()

  return (
    <div className="grid_image">
      {
        postIds.map(id => (
          <StorePostItem key={id} id={id}/>
        ))
      }
    </div>
  )
}

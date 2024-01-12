
import PostItem from "@containers/events/PostItem";
import {getEventPostIdsApi} from "@services/eventPost";



export default async function EventPosts() {
  const eventPostIds = await getEventPostIdsApi(1)

  return (
    <div className="grid_image">
      {
        eventPostIds.map(id => (
          <PostItem key={id} id={id}/>
        ))
      }
    </div>
  )
}

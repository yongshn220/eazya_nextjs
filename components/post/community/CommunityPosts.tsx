import GeneralDetailPostItem from "@containers/general/DetailPostItem";
import PostPagination from "@components/page/PostPagination";
import getCommunityPostIdsAction from "@actions/community/getCommunityPostIdsAction";

export default async function CommunityPosts({type}) {
  const postIds = await getCommunityPostIdsAction(type)

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-300 border-t border-gray-300 ">
        {
          postIds.map(id => (
            <GeneralDetailPostItem key={id} id={id} type={type}/>
          ))
        }
      </ul>
    </div>
  )
}

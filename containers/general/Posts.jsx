import GeneralDetailPostItem from "@containers/general/DetailPostItem";
import PostPagination from "@components/page/PostPagination";
import getGeneralPostIdsAction from "@actions/general/getGeneralPostIdsAction";

export default async function GeneralPosts({type}) {
  const postIds = await getGeneralPostIdsAction(type)

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-300 border-t border-gray-300 ">
        {
          postIds.map(id => (
            <GeneralDetailPostItem key={id} id={id}/>
          ))
        }
      </ul>
    </div>
  )
}

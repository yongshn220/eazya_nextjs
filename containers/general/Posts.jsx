import GeneralDetailPostItem from "@containers/general/DetailPostItem";
import PostPagination from "@components/page/PostPagination";
import getGeneralIdsAction from "@actions/general/getGeneralIdsAction";

export default async function GeneralPosts({type}) {

  const postIds = await getGeneralIdsAction(type)

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-300 border-t border-gray-300 ">
        {
          postIds.map(id => (
            <GeneralDetailPostItem id={id}/>
          ))
        }
      </ul>
    </div>
  )
}

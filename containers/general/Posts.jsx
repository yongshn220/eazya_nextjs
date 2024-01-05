import GeneralDetailPostItem from "@containers/general/GeneralDetailPostItem";
import PostPagination from "@components/page/PostPagination";

export default function GeneralPosts({type}) {
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-300 border-t border-gray-300 ">
        <GeneralDetailPostItem id={1}/>
        <GeneralDetailPostItem id={2}/>
        <GeneralDetailPostItem id={3}/>
        <GeneralDetailPostItem id={4}/>
        <GeneralDetailPostItem id={5}/>
      </ul>
    </div>
  )
}

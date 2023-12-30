import TextDetailPostItem from "@components/contents/TextDetailPostItem";
import PostPagination from "@components/page/PostPagination";

export default function GeneralPosts({type}) {
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-300 border-t border-gray-300 ">
        <TextDetailPostItem/>
        <TextDetailPostItem/>
        <TextDetailPostItem/>
        <TextDetailPostItem/>
        <TextDetailPostItem/>
      </ul>
    </div>
  )
}

import TextDetailPostItem from "@components/postItems/TextDetailPostItem";
import PostPagination from "@components/page/PostPagination";

export default function GeneralPosts({type}) {
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-300 border-t border-gray-300 ">
        <TextDetailPostItem id={1}/>
        <TextDetailPostItem id={2}/>
        <TextDetailPostItem id={3}/>
        <TextDetailPostItem id={4}/>
        <TextDetailPostItem id={5}/>
      </ul>
    </div>
  )
}

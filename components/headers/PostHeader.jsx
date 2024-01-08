import InfoHeader from "@components/headers/InfoHeader";
import PostDropDown from "@components/menu/PostDropDown";

export default function PostHeader({ post, handlePostDelete }) {

  return (
    <div>
      <div className="w-full flex sm:flex-col pb-3 border-b">
        <p className="font-semibold">
          SBU {post.title}
          <span className="ml-2 font-normal">
            {post.tag ? `/ ${post.tag}` : ''}
          </span>
        </p>
      </div>

      <div className="w-full flex-center gap-6 mt-3 mb-5">
        <InfoHeader/>
        <div className="cursor-pointer">
          <PostDropDown authorId={post.authorId} handlePostDelete={handlePostDelete}/>
        </div>
      </div>
    </div>
  )
}


import InfoHeader from "@components/headers/InfoHeader";
import PostDropDown from "@components/menu/PostDropDown";
import {IPostHeader} from "@models/types/postHeader";
import {IEventPost} from "@models/collections/eventPost";

export interface IDropDown {
  authorId: string;
  postDeleteHandler: Function;
  editHref: string;
}

interface Props {
  postHeaderData: IPostHeader;
}

export default function PostHeader({postHeaderData}: Props) {
  const post = postHeaderData.post as IEventPost

  const dropDownData: IDropDown = {
    authorId: post.authorId,
    postDeleteHandler: postHeaderData.deletePostHandler,
    editHref: postHeaderData.editHref
  }

  return (
    <div>
      <div className="w-full flex sm:flex-col pb-3 border-b">
        <p className="font-semibold">
          SBU {post.type}
          <span className="ml-2 font-normal">
            {/*{post.tag ? `/ ${post.tag}` : ''}*/}
          </span>
        </p>
      </div>

      <div className="w-full flex-center gap-6 mt-3 mb-5">
        <InfoHeader
          author={"Author"}
          date={post.createdAt}
          votes={post.votes}
          createVoteHandler={postHeaderData.createVoteHandler}
          myVoteType={post.myVoteType}
        />
        <div className="cursor-pointer">
          <PostDropDown dropDownData={dropDownData}/>
        </div>
      </div>
    </div>
  )
}

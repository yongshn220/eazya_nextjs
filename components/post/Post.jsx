import {PostType} from "@components/post/constants";
import ContentHeader from "@components/headers/ContentHeader";
import EventContent from "@components/post/EventContent";
import GeneralContent from "@components/post/GeneralContent";
import StoreContent from "@components/post/StoreContent";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";


export default function Post({type, post}) {


  return (
    <section className="w-full flex flex-col">
      <ContentHeader title={type}/>
      <Contents type={type}/>
      <CreateComment/>
      <CommentList/>
    </section>
  )
}

function Contents({type}) {
  return (
    <>
      {type === PostType.EVENT && <EventContent/>}
      {type === PostType.GENERAL && <GeneralContent/>}
      {type === PostType.STORE && <StoreContent/>}
    </>
  )
}

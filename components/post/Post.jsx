import ContentHeader from "@components/headers/ContentHeader";
import EventContent from "@components/post/EventContent";
import GeneralContent from "@components/post/GeneralContent";
import StoreContent from "@components/post/StoreContent";
import CreateComment from "@components/post/comment/CreateComment";
import CommentList from "@components/post/comment/CommentList";
import {PostType} from "@components/constants/enums";


export default function Post({type, post}) {
  const subtitle = post.tag?? ""

  return (
    <section className="w-full flex flex-col">
      <ContentHeader title={type} subtitle={subtitle}/>
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

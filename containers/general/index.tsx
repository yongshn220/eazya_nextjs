import HomeHeader from "@components/headers/HomeHeader";
import GeneralMenu from "@containers/general/Menu";
import GeneralSearch from "@containers/general/Search";
import GeneralPosts from "@containers/general/Posts";
import PostPagination from "@components/page/PostPagination";
import {GeneralCommunityType, NavTab} from "@components/constants/enums";
import NavTabSelector from "@components/nav/NavTabSelector";

export default function General({type}: {type: GeneralCommunityType}) {

  return (
    <section className="w-full">
      <NavTabSelector tab={NavTab.GENERAL}/>
      <HomeHeader
        title={type}
        subtitle="See the upcoming events on the campus"
        buttonName="Post"
        createRoute={`create-general-post?type=${type}`}
      />
      <div className="w-full">
        <div className="w-full flex-col justify-center gap-20">
          <GeneralMenu type={type}/>
          <GeneralSearch/>
          <GeneralPosts type={type}/>
          <PostPagination/>
        </div>
      </div>
    </section>
  )
}

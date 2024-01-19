import HomeHeader from "@components/headers/HomeHeader";
import GeneralPosts from "@containers/general/Posts";
import PostPagination from "@components/page/PostPagination";
import {CommunityType, NavTab, PostType} from "@components/constants/enums";
import NavTabSelector from "@components/nav/NavTabSelector";
import CommunityMenu from "@components/post/community/CommunityMenu";
import CommunitySearch from "@components/post/community/CommunitySearch";

export default function General({communityType}: {communityType: CommunityType}) {

  return (
    <section className="w-full">
      <NavTabSelector tab={NavTab.GENERAL}/>
      <HomeHeader
        title={communityType}
        subtitle="See the upcoming events on the campus"
        buttonName="Post"
        createRoute={`create-general-post?type=${communityType}`}
      />
      <div className="w-full">
        <div className="w-full flex-col justify-center gap-20">
          <CommunityMenu postType={PostType.GENERAL} communityType={communityType}/>
          <CommunitySearch/>
          <GeneralPosts type={communityType}/>
          <PostPagination/>
        </div>
      </div>
    </section>
  )
}

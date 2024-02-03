import HomeHeader from "@components/headers/HomeHeader";
import PostPagination from "@components/page/PostPagination";
import {CommunityType, NavTab, PostType, StudentGroupType} from "@components/constants/enums";
import NavTabSelector from "@components/nav/NavTabSelector";
import CommunityMenu from "@components/post/community/CommunityMenu";
import CommunitySearch from "@components/post/community/CommunitySearch";
import CommunityPosts from "@components/post/community/CommunityPosts";

export default function FindMember({communityType}: {communityType: CommunityType}) {

  return (
    <section className="w-full">
      <NavTabSelector tab={NavTab.FIND_MEMBER}/>
      <HomeHeader
        title={PostType.FIND_MEMBER}
        subtitle="Recruit and participate in a variety of small groups, clubs, and projects!"
        buttonName="Post"
        createRoute={`create-find-member-post?type=${communityType}`}
      />
      <div className="w-full">
        <div className="w-full flex-col justify-center gap-20">
          <CommunityMenu postType={PostType.FIND_MEMBER} communityType={communityType} communityList={Object.values(StudentGroupType)}/>
          <CommunitySearch/>
          <CommunityPosts postType={PostType.FIND_MEMBER} communityType={communityType}/>
        </div>
      </div>
    </section>
  )
}

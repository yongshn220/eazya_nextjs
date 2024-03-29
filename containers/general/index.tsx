import HomeHeader from "@components/headers/HomeHeader";
import {CommunityType, KnowledgeType, NavTab, PostType, StudentGroupType} from "@components/constants/enums";
import NavTabSelector from "@components/nav/NavTabSelector";
import CommunityMenu from "@components/post/community/CommunityMenu";
import CommunitySearch from "@components/post/community/CommunitySearch";
import CommunityPosts from "@components/post/community/CommunityPosts";
import {getCommunityPostFormPath} from "@components/constants/tags";

export default function General({communityType}: {communityType: CommunityType}) {

  return (
    <section className="w-full">
      <NavTabSelector tab={NavTab.GENERAL}/>
      <HomeHeader
        title={`${PostType.GENERAL}`}
        subtitle={`Share anything and everything! :)`}
        buttonName="Post"
        createRoute={getCommunityPostFormPath(PostType.GENERAL, communityType)}
      />
      <div className="w-full">
        <div className="w-full flex-col justify-center gap-20">
          <CommunityMenu postType={PostType.GENERAL} communityType={communityType} communityList={Object.values(StudentGroupType)}/>
          <CommunitySearch/>
          <CommunityPosts postType={PostType.GENERAL} communityType={communityType}/>
        </div>
      </div>
    </section>
  )
}




import HomeHeader from "@components/headers/HomeHeader";
import {CommunityType, KnowledgeType, NavTab, PostType} from "@components/constants/enums";
import NavTabSelector from "@components/nav/NavTabSelector";
import CommunityMenu from "@components/post/community/CommunityMenu";
import CommunitySearch from "@components/post/community/CommunitySearch";
import CommunityPosts from "@components/post/community/CommunityPosts";
import {getCommunityPostFormPath} from "@components/constants/tags";

export default function KnowledgeHub({communityType}: {communityType: CommunityType}) {

  return (
    <section className="w-full">
      <NavTabSelector tab={NavTab.KNOWLEDGE_HUB}/>
      <HomeHeader
        title={`${PostType.KNOWLEDGE_HUB}`}
        subtitle={`Share your knowledge`}
        buttonName="Post"
        createRoute={getCommunityPostFormPath(PostType.KNOWLEDGE_HUB, communityType)}
      />
      <div className="w-full">
        <div className="w-full flex-col justify-center gap-20">
          <CommunityMenu postType={PostType.KNOWLEDGE_HUB} communityType={communityType} communityList={Object.values(KnowledgeType)}/>
          <CommunitySearch/>
          <CommunityPosts postType={PostType.KNOWLEDGE_HUB} communityType={communityType}/>
        </div>
      </div>
    </section>
  )
}

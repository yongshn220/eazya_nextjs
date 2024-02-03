import GeneralPreview from "@containers/home/GeneralPreview";
import FindMemberPreview from "@containers/home/FindMemberPreview";
import KnowledgeHubPreview from "@containers/home/KnowledgeHubPreview";

const MAX_ITEM_LENGTH = 4

export default async function CommunityGroupPreview() {

  return (
    <section className="w-full flex-col px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid_12">
        <GeneralPreview maxItemLength={MAX_ITEM_LENGTH}/>
        <FindMemberPreview maxItemLength={MAX_ITEM_LENGTH}/>
        <KnowledgeHubPreview maxItemLength={MAX_ITEM_LENGTH}/>
      </div>
    </section>
  )
}

import General from "@containers/general";
import {CommunityType, KnowledgeType} from "@components/constants/enums";
import {Metadata} from "@node_modules/next";
import KnowledgeHub from "@containers/knowledgeHub/KnowledgeHub";

export const metadata: Metadata = {
  title: "University General - A Hub for Student Interaction on Any Topic",
  description: "Join the vibrant University General forum, a dynamic space where students from all disciplines come together to discuss, share, and explore a wide range of topics.",
  keywords: "University Forum, Student Interaction, Campus Discussions, Academic Exchange, General Topics, University Community",
}

export default function KnowledgeHubHome({params}) {
  const type: KnowledgeType = params.type

  return (
    <KnowledgeHub communityType={type}/>
  )
}

import General from "@containers/general";
import {CommunityType} from "@components/constants/enums";
import {Metadata} from "@node_modules/next";

export const metadata: Metadata = {
  title: "University General",
  description: "It's a place where students can interact with each other freely, no matter the topic."
}

export default function GeneralHome({params}) {
  const type: CommunityType = params.type

  return (
    <General communityType={type}/>
  )
}

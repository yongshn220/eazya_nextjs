import {CommunityType} from "@components/constants/enums";
import FindMember from "@containers/find-member";
import {Metadata} from "@node_modules/next";


export const metadata: Metadata = {
  title: 'University Find-Member',
  description: "It's a place where students can find out about competitions, projects, studies, clubs, and small activities within the university and find friends to do them with.",
}

export default function FindMemberHome({params}) {
  const type: CommunityType = params.type

  return (
    <FindMember communityType={type} />
  )
}

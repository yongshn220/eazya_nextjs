import {CommunityType} from "@components/constants/enums";
import FindMember from "@containers/find-member";


export default function FindMemberHome({params}) {
  const type: CommunityType = params.type

  return (
    <FindMember communityType={type} />
  )
}

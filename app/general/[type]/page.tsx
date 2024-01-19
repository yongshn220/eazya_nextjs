import General from "@containers/general";
import {CommunityType} from "@components/constants/enums";

export default function GeneralHome({params}) {
  const type: CommunityType = params.type

  return (
    <General communityType={type}/>
  )
}

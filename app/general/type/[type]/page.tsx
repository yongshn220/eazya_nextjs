import General from "@containers/general";
import {GeneralCommunityType} from "@components/constants/enums";

export default function GeneralHome({params}) {
  const type: GeneralCommunityType = params.type

  return (
    <General type={type}/>
  )
}

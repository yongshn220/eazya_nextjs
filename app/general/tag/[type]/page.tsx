import General from "@containers/general";
import {GeneralMenuType} from "@components/constants/enums";

export default function GeneralHome({params}) {
  const type: GeneralMenuType = params.type

  return (
    <General type={type}/>
  )
}

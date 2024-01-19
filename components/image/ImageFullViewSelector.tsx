"use client"

import {useSetRecoilState} from "@node_modules/recoil";
import {imageFullViewAtom} from "@components/constants/globalStates";

export default function ImageFullViewSelector({src, children}) {
  const setImageFullView = useSetRecoilState(imageFullViewAtom)

  return (
    <div onClick={() => setImageFullView(src)} className="cursor-pointer">
      {children}
    </div>
  )
}

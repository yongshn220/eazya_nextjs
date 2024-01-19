import {atom} from "recoil";
import {NavTab} from "@components/constants/enums";


export const imageFullViewAtom = atom<string | null>({
  key: 'imageFullViewAtom',
  default: null,
})


export const selectedNavTabAtom = atom<NavTab>({
  key: 'selectedNavTabAtom',
  default: NavTab.NONE,
})

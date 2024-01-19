import {atom} from "recoil";


export const imageFullViewAtom = atom<string | null>({
  key: 'imageFullViewAtom',
  default: null,
})

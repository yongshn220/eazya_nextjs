"use client"

import {NavTab} from "@components/constants/enums";
import {useSetRecoilState} from "@node_modules/recoil";
import {selectedNavTabAtom} from "@components/constants/globalStates";
import {useEffect} from "react";

export default function NavTabSelector({tab}: {tab: NavTab}) {
  const setSelectedNavTab = useSetRecoilState(selectedNavTabAtom)

  useEffect(() => {
    setSelectedNavTab(tab)
  }, [])

  return <></>
}

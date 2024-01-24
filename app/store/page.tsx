import Store from '@containers/store'
import {Metadata} from "@node_modules/next";


export const metadata: Metadata = {
  title: "University Buy and Sell",
  description: ""
}

export default function StoreHome() {

  return (
    <Store/>
  )
}

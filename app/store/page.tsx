import Store from '@containers/store'
import {Metadata} from "@node_modules/next";


export const metadata: Metadata = {
  title: "University Buy and Sell - Marketplace for Students",
  description: "Explore the University Buy and Sell platform, a dedicated marketplace for students to buy, sell, or exchange textbooks, electronics, dorm essentials, and more within the university community.",
  keywords: "University Marketplace, Student Buy and Sell, Campus Exchange, Textbooks, Electronics, Dorm Supplies",
}

export default function StoreHome() {

  return (
    <Store/>
  )
}

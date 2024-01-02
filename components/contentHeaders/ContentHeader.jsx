import {Button} from "@components/ui/button";
import Link from 'next/link'

export default function ContentHeader({ title, subtitle, buttonName, createRoute }) {
  return (
    <div className="flex justify-between sm:flex-col pb-5 border-b">
      <p className="head2_text blue_gradient">
        SBU {title}
      </p>
    </div>
  )
}

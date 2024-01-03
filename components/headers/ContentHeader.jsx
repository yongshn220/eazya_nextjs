import {Button} from "@components/ui/button";
import Link from 'next/link'

export default function ContentHeader({ title }) {
  return (
    <div className="w-full flex justify-between sm:flex-col pb-3 border-b">
      <p className="text-xl font-bold">
        SBU {title}
      </p>
    </div>
  )
}

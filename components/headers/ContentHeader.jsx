import {Button} from "@components/ui/button";
import Link from 'next/link'

export default function ContentHeader({ title, subtitle }) {
  return (
    <div className="w-full flex sm:flex-col pb-3 border-b">
      <p className="text-xl font-bold">
        SBU {title}
        {
          subtitle !== "" &&
          <span className="ml-2 text-lg font-normal">
            / {subtitle}
          </span>
        }
      </p>
    </div>
  )
}

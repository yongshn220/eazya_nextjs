import {Button} from "@components/ui/button";
import Link from 'next/link'

export default function PostHeader({ title, subtitle }) {
  return (
    <div className="w-full flex sm:flex-col pb-3 border-b">
      <p className="font-semibold">
        SBU {title}
        {
          subtitle !== "" &&
          <span className="ml-2 font-normal">
            / {subtitle}
          </span>
        }
      </p>
    </div>
  )
}

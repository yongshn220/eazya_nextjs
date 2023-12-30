import {Button} from "@components/ui/button";
import Link from 'next/link'

export default function ContentHomeHeader({ title, subtitle, buttonName, createRoute }) {
  return (
    <div className="flex justify-between sm:flex-col pb-5 border-b">
      <p className="head2_text blue_gradient">
        SBU {title}
      </p>
      <div className="flex justify-between items-center">
        <p className="hidden sm:flex desc mb-4 sm:mb-0">
          {subtitle}
        </p>
        <Link href={`/${createRoute}`}>
          <Button className="self-end sm:self-auto">Add {buttonName}</Button>
        </Link>
      </div>
    </div>
  )
}

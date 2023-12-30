import {Button} from "@components/ui/button";

export default function ContentHeader({ title, subtitle, buttonName }) {
  return (
    <div className="flex justify-between sm:flex-col pb-5 border-b">
      <p className="head2_text blue_gradient">
        SBU {title}
      </p>
      <div className="flex justify-between items-center">
        <p className="hidden sm:flex desc mb-4 sm:mb-0">
          {subtitle}
        </p>
        <Button className="self-end sm:self-auto">Add {buttonName}</Button>
      </div>
    </div>
  )
}

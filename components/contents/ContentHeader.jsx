import {Button} from "@components/ui/button";

export default function ContentHeader({title, subtitle, buttonName}) {
  return (
    <div className="flex flex-col pb-5 border-b-2">
      <p className="head2_text blue_gradient">
        SBU {title}
      </p>
      <div className="flex flex-between">
        <p className="desc">
          {subtitle}
        </p>
        <Button>Add {buttonName}</Button>
      </div>
    </div>
  )
}

import {Button} from "@components/ui/button";

export default function ContentFormHeader({mode, title, subtitle}) {

  if (mode === "Create") mode = "Add"

  return (
    <div className="flex justify-between sm:flex-col">
      <p className="head2_text blue_gradient">
        {`${mode} ${title}`}
      </p>
      <div className="flex justify-between items-center">
        <p className="hidden sm:flex desc mb-4 sm:mb-0">
          {subtitle}
        </p>
      </div>
    </div>
  )
}

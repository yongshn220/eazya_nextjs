import {highlightedTextColor, hoveredTextColor} from "@components/constants/values";
import { Badge } from "@components/ui/badge"
import Link from 'next/link'

export default function ActivityItem() {
  return (
    <div className="w-full cursor-pointer group">
      <Link href="#">
        <div className="w-full flex-start flex-col gap-3 py-6">
          <div className="w-full flex-between">
            <div className="flex-center gap-2">
              <Badge variant="outline" className="border-gray-300">Event</Badge>
              <p className="text-sm text-gray-500">You have created the <span className={`${highlightedTextColor}`}>post</span>.</p>
            </div>
            <p className="text-sm text-gray-500">
              2023-12-04 12:12:30
            </p>
          </div>
          <p className={`font-semibold group-hover:${hoveredTextColor}`}>This is a title of the post.</p>
        </div>
      </Link>
    </div>
  )
}

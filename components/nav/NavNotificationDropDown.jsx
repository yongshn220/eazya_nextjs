import NotificationIcon from "@public/assets/icons/notification.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@components/ui/dropdown-menu";
import MailIcon from '@public/assets/icons/mail.svg'
import {Badge} from "@components/ui/badge";

export default function NavNotificationDropDown() {
  return (
    <div className="h-full">
      <DropdownMenu>
        <DropdownMenuTrigger className="h-full">
          <div className="flex-center h-full hover:scale-[1.1] cursor-pointer">
            <NotificationIcon/>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96 p-2">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <div className="divide-y">
            <NotificationItem/>
            <NotificationItem/>
            <NotificationItem/>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function NotificationItem() {
  return (
    <DropdownMenuItem className="cursor-pointer">
      <div className="w-full flex-start flex-col py-3 gap-2">
        <div className="w-full flex-between">
          <Badge variant="outline" className="border-gray-300">General</Badge>
          <div className="text-xs text-gray-500">4 days ago</div>
        </div>
        <p className="w-full flex-start font-semibold line-clamp-1">
          This is a sample title and sample title and title and title and title
        </p>
        <p className="text-xs text-gray-600">
          Someone added a comment on you post.
        </p>
      </div>
    </DropdownMenuItem>
  )
}

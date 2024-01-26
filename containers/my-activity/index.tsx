import {Button} from "@components/ui/button";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/option";
import ActivityContent from "@containers/my-activity/ActivityContent";
import getUserActivityIdsAction from "@actions/userActivity/getUserActivityIdsAction";
import {UserActivityMenu} from "@components/constants/enums";
import Link from "next/link";
import {UserHexaIcon} from "@components/icon/icons";

export default async function MyActivity() {
  const session = await getServerSession(authOptions)
  if (!session) return (<></>)

  const activityIds = await getUserActivityIdsAction(UserActivityMenu.ALL, 1)

  return (
    <section className="w-full">
      <p className="text-xl font-bold pb-3 border-b">
        My Activity
      </p>

      <div className="flex-between glassmorphism mt-4">
        <div className="flex-center gap-4">
          <UserHexaIcon/>
          <p className="text-sm sm:text-base font-semibold">{session?.user.email}</p>
        </div>
        <Link href={"/account"}>
          <Button variant="outline">My Account</Button>
        </Link>
      </div>
      <ActivityContent activityIds={activityIds}/>
    </section>
  )
}

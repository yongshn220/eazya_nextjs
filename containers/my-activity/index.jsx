import Image from "next/image";
import {Button} from "@components/ui/button";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import ActivityContent from "@containers/my-activity/Content";
import getUserActivitiesAction from "@actions/userActivity/getUserActivitiesAction";

export default async function MyActivity() {
  const session = await getServerSession(authOptions)
  if (!session) return (<></>)

  const activities = await getUserActivitiesAction(session)

  return (
    <section className="w-full">
      <p className="text-xl font-bold pb-3 border-b">
        My Activity
      </p>

      <div className="flex-between glassmorphism mt-4">
        <div className="flex-center gap-4">
          <Image src={session?.user.image} width={37} height={37} className="rounded-full" alt="profile" />
          <p className="font-semibold">{session?.user.email}</p>
        </div>
        <Button variant="outline">My Account</Button>
      </div>
      <ActivityContent activities={activities}/>
    </section>
  )
}

import ActivityItem from "@containers/my-activity/ActivityItem";

export default function ActivityList() {
  return (
    <div className="w-full flex-center flex-col divide-y divide-gray-300 border-b border-gray-300">
      <ActivityItem/>
      <ActivityItem/>
      <ActivityItem/>
      <ActivityItem/>
      <ActivityItem/>
    </div>
  )
}

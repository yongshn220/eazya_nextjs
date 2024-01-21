import Events from "@containers/events";

export const revalidate = 3600 // revalidate the data at most every hour

export default async function EventPage() {
  return (
    <Events/>
  )
}

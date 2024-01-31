import Events from "@containers/events";
import {Metadata} from "@node_modules/next";

export const metadata: Metadata = {
  title: 'University Events - Stay Updated with Campus Activities',
  description: 'Explore the latest university events, including seminars, workshops, cultural festivals, and academic conferences. Stay connected with campus life and opportunities for learning and networking.',
  keywords: 'University Events, Campus Activities, Academic Conferences, Student Workshops, Cultural Festivals, Educational Seminars',
}

export default async function EventPage() {
  return (
    <Events/>
  )
}

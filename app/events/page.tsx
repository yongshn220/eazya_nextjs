import Events from "@containers/events";
import {Metadata} from "@node_modules/next";

export const metadata: Metadata = {
  title: 'University events',
  description: 'This page introduces various events held at the university.',
}

export default async function EventPage() {
  return (
    <Events/>
  )
}

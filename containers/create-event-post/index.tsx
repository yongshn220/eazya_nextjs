import EventForm from "@containers/create-event-post/EventForm";
import {FormMode, PostType} from "@components/constants/enums";
import {createEventPostAction} from "@actions/event/createEventAction";
import {CreateEventPostRequest} from "@models/requests/CreateEventPostRequest";
import { redirect } from 'next/navigation'
import {revalidatePath} from "next/cache";


export default function CreateEventPost() {

  async function createEvent(formData: FormData) {
    "use server"
    const req: CreateEventPostRequest = {
      image: formData.get('Image') as File,
      type: PostType.EVENT,
      title: formData.get('Title') as string,
      date: formData.get('Date') as string,
      time: formData.get('Time') as string ,
      location: formData.get('Location') as string,
      description: formData.get('Description') as string,
    }

    await createEventPostAction(req)
    revalidatePath('/events')
    redirect('/events')
  }

  return (
    <section className="w-full">
      <EventForm
        mode={FormMode.CREATE}
        handleSubmit={createEvent}
      />
    </section>
  )
}

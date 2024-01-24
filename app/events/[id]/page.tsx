import EventPost from "@containers/events/id/EventPost";
import Head from 'next/head';
import React, {Fragment} from "react";
import {IEventPost} from "@models/collections/eventPost";
import getEventPostAction from "@actions/event/getEventPostAction";


export default async function EventPostPage({ params }) {
  const postId = params.id

  const post: IEventPost  = await getEventPostAction(postId)
  if (!post) return <></>

  return (
    <Fragment>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description}/>
      </Head>
      <EventPost post={post}/>
    </Fragment>
  )
}

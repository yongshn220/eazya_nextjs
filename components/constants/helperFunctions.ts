import {IPost} from "@models/union/union";


export function getNumOfCommentsInPost(post: IPost) {
  let numberOfComments = 0
  post.comments.forEach(comment => {
    numberOfComments += comment.replies.length + 1
  })
  return numberOfComments
}



import {PostType, VoteType} from "@components/constants/enums";
import {EventPostModel} from "@models/collections/eventPost";
import {VoteUser} from "@models/base/voteUserBase";
import {GeneralPostModel} from "@models/collections/generalPost";
import {toJson} from "@actions/actionHelper/utilFunction";
import {IPost} from "@models/union/union";
import {Session} from "@node_modules/next-auth";
import {StorePostModel} from "@models/collections/storePost";
import {FindMemberPostModel} from "@models/collections/findMemberPost";

/*-------------
     MODEL
--------------*/
export function GetPostModelByType(postType: PostType) {
  if (postType === PostType.EVENT) return EventPostModel
  if (postType === PostType.GENERAL) return GeneralPostModel
  if (postType === PostType.FIND_MEMBER) return FindMemberPostModel
  if (postType === PostType.STORE) return StorePostModel
  return null
}

export function getCommunityPostModelByType(postType: PostType) {
  if (postType === PostType.GENERAL) return GeneralPostModel
  if (postType === PostType.FIND_MEMBER) return FindMemberPostModel
  return null
}

/*-------------
     COMMENT
--------------*/
export function getCommentAuthorNameAndSave(post: any, userId: string) {
  post = toJson(post)
  if (post.authorId === userId) return "Author"
  if (post.commentators.includes(userId)) return post.commentators.indexOf(userId) + 1;

  post.commentators.push(userId);
  post.save()
  return post.commentators.length;
}


/*-------------
     VOTE
--------------*/
export function getUserVoteType(userId: string, voteUser: VoteUser) {
  const upvoteIds = voteUser.upvoted.map(id => id.toString())
  const downvoteIds = voteUser.downvoted.map(id => id.toString())
  if (upvoteIds.includes(userId)) return VoteType.UP
  if (downvoteIds.includes(userId)) return VoteType.DOWN
  else return VoteType.NONE
}


/*-------------
     POST
--------------*/
export function makePostAnonymous(post: IPost) {
  post.voteUser = {upvoted: ["CONCEALED"], downvoted: ["CONCEALED"]}
  post.authorId = "CONCEALED"
  post.commentators = ["CONCEALED"]
  post.comments.forEach(comment => {
    comment.voteUser = {upvoted: ["CONCEALED"], downvoted: ["CONCEALED"]}
    comment.authorId = "CONCEALED"
    comment.replies.forEach(reply => {
      reply.voteUser = {upvoted: ["CONCEALED"], downvoted: ["CONCEALED"]}
      reply.authorId = "CONCEALED"
    })
  })
  return post
}

export function setDynamicDataToPost(session: Session, post: IPost) {
  if (!session) {
      post.myVoteType = VoteType.NONE
      return makePostAnonymous(post)
    }

  const userId = session.user.id

  post.myVoteType = getUserVoteType(userId, post.voteUser)
  post.isMine = (post.authorId === userId)

  post.comments.forEach(comment => {
    comment.myVoteType = getUserVoteType(userId, comment.voteUser)
    comment.isMine = (comment.authorId === userId)

    comment.replies.forEach(reply => {
      reply.myVoteType = getUserVoteType(userId, reply.voteUser)
      reply.isMine = (reply.authorId === userId)
    })
  })

  return makePostAnonymous(post)
}

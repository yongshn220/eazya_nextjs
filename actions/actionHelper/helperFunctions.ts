import {PostType, VoteType} from "@components/constants/enums";
import {EventPostModel} from "@models/collections/eventPost";
import {VoteUser} from "@models/base/voteUserBase";
import {GeneralPostModel} from "@models/collections/generalPost";
import {toJson} from "@actions/actionHelper/utilFunction";
import {IPost} from "@models/union/union";
import {Session} from "@node_modules/next-auth";
import {StorePostModel} from "@models/collections/storePost";
import {FindMemberPostModel} from "@models/collections/findMemberPost";
import {toElapsed} from "@components/constants/helperFunctions";
import {CommentBase} from "@models/base/commentBase";
import {ReplyBase} from "@models/base/replyBase";

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
export function getCommentAuthorName(post: any, userId: string) {
  post = toJson(post)
  if (post.authorId === userId) return "Author"
  if (post.commentators.includes(userId)) return post.commentators.indexOf(userId) + 1;
  post.commentators.push(userId);
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
  setDynamicData(session, post)

  post.comments.forEach(comment => {
    setDynamicData(session, comment)
    handleSecretMessage(session, post.authorId, comment)

    comment.replies.forEach(reply => {
      setDynamicData(session, reply)
      handleSecretMessage(session, comment.authorId, reply)
    })
  })

  return makePostAnonymous(post)
}

function setDynamicData(session: Session, act: IPost | CommentBase | ReplyBase) {
  if (session) {
    act.myVoteType = getUserVoteType(session.user.id, act.voteUser)
    act.isMine = (act.authorId === session.user.id)
  }
  else {
    act.myVoteType = VoteType.NONE
    act.isMine = false
  }
  act.createdAt = toElapsed(act.createdAt.toString())
}


function handleSecretMessage(session: Session, targetAuthorId: string, msg: ReplyBase | CommentBase) {
  if (!msg.isSecret) {
    msg.hasAuthorityToRead = true; return
  }
  if (!session) {
    msg.hasAuthorityToRead = false; return
  }
  if (session?.user.id === msg.authorId || session?.user.id === targetAuthorId) {
    msg.hasAuthorityToRead = true; return
  }

  msg.content = "CONCEALED"
  msg.hasAuthorityToRead = false
}

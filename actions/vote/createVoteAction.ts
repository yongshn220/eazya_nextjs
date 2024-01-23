"use server"

import {CreateVoteRequest} from "@models/requests/CreateVoteRequest";
import {connectToDB} from "@utils/database";
import {getServerSession} from "@node_modules/next-auth/next";
import {authOptions} from "@app/api/auth/[...nextauth]/route";
import {GetPostModelByType} from "@actions/actionHelper/helperFunctions";
import {CommunityType, NotificationType, VoteType} from "@components/constants/enums";
import {revalidateTag} from "next/cache";
import {ObjectId} from "mongodb";
import mongoose from "mongoose";
import {CreateNotificationRequest} from "@models/requests/CreateNotificationRequest";
import createNotificationAction from "@actions/notification/createNotificationAction";
import findAndDeleteNotificationAction from "@actions/notification/findAndDeleteNotificationAction";
import {getPostTag} from "@components/constants/tags";
import {IPost} from "@models/union/union";

enum VotingResult {
  CANCEL,
  ADD
}

export default async function createVoteAction(req: CreateVoteRequest) {
  await connectToDB();
  const session = await getServerSession(authOptions);
  if (!session) return null

  try {

    const PostModel = GetPostModelByType(req.postType)
    if (!PostModel) return null

    const post = await PostModel.findById(req.postId)
    if (!post) return null

    const votingTarget = getVotingTarget(post, req)
    if (!votingTarget) return null

    const votingResult: VotingResult = handleVoting(session.user.id, req.voteType, votingTarget)
    await post.save()

    const notiReq = createNotificationRequest(req, session.user.id, post.communityType, votingTarget)

    if (votingResult === VotingResult.CANCEL) {
      await findAndDeleteNotificationAction(notiReq)
    }
    else {
      await createNotificationAction(notiReq)
      await findAndDeleteNotificationAction({...notiReq, notificationType: getOppositeNotificationType(notiReq.notificationType)})
    }

    return post.votes
  }
  catch (error) {
    console.error('Error in createVoteAction:', error)
    return null
  }
  finally {
    revalidateTag(getPostTag(session.user.id, req.postId, req.postType))
  }
}

function getVotingTarget(post: any, req: CreateVoteRequest) {
  if (!req.commentId) return post;
  const comment = post.comments.id(req.commentId);
  if (!req.replyId) return comment;
  return comment?.replies.id(req.replyId);
}

function handleVoting(userId: string, voteType: VoteType, target: any): VotingResult {
  const id = new mongoose.Types.ObjectId(userId);
  const hasUpvoted = target.voteUser.upvoted.includes(userId);
  const hasDownvoted = target.voteUser.downvoted.includes(userId);

  let result: VotingResult

  if (voteType === VoteType.UP) {
    if (hasUpvoted) {
      target.voteUser.upvoted = removeUserIdFromVotes(target.voteUser.upvoted, id);
      result = VotingResult.CANCEL
    }
    else {
      target.voteUser.downvoted = removeUserIdFromVotes(target.voteUser.downvoted, id);
      target.voteUser.upvoted.push(userId);
      result = VotingResult.ADD
    }
  }
  else if (voteType === VoteType.DOWN) {
    if (hasDownvoted) {
      target.voteUser.downvoted = removeUserIdFromVotes(target.voteUser.downvoted, id);
      result = VotingResult.CANCEL
    }
    else {
      target.voteUser.upvoted = removeUserIdFromVotes(target.voteUser.upvoted, id);
      target.voteUser.downvoted.push(userId);
      result = VotingResult.ADD
    }
  }
  target.votes = target.voteUser.upvoted.length - target.voteUser.downvoted.length;
  return result
}

function removeUserIdFromVotes(votes: Array<ObjectId>, userId: ObjectId) {
   return votes.filter((oid: ObjectId) => !oid.equals(userId));
}

function createNotificationRequest(req: CreateVoteRequest, userId: string, communityType: CommunityType,  votingTarget: any): CreateNotificationRequest {
  let notificationType: NotificationType
  let preview: string

  if (!req.commentId) {
    notificationType = (req.voteType === VoteType.UP)? NotificationType.UPVOTE_ON_POST : NotificationType.DOWNVOTE_ON_POST
    preview = votingTarget.title
  }
  else if (!req.replyId) {
    notificationType = (req.voteType === VoteType.UP)? NotificationType.UPVOTE_ON_COMMENT : NotificationType.DOWNVOTE_ON_COMMENT
    preview = votingTarget.content
  }
  else {
    notificationType = (req.voteType === VoteType.UP)? NotificationType.UPVOTE_ON_REPLY : NotificationType.DOWNVOTE_ON_REPLY
    preview = votingTarget.content
  }

  return {
    fromUserId: userId,
    toUserId: votingTarget.authorId,
    notificationType,
    postType: req.postType,
    communityType: communityType ?? null,
    postId: req.postId,
    commentId: req.commentId,
    replyId: req.replyId,
    preview,
  };
}

function getOppositeNotificationType(type: NotificationType): NotificationType {
  switch(type) {
    case NotificationType.UPVOTE_ON_POST: return NotificationType.DOWNVOTE_ON_POST
    case NotificationType.UPVOTE_ON_COMMENT: return NotificationType.DOWNVOTE_ON_COMMENT
    case NotificationType.UPVOTE_ON_REPLY: return NotificationType.DOWNVOTE_ON_REPLY
    case NotificationType.DOWNVOTE_ON_POST: return NotificationType.UPVOTE_ON_POST
    case NotificationType.DOWNVOTE_ON_COMMENT: return NotificationType.UPVOTE_ON_COMMENT
    case NotificationType.DOWNVOTE_ON_REPLY: return NotificationType.UPVOTE_ON_REPLY
    default: return null
  }
}


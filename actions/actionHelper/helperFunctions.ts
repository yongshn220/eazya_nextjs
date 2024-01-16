import {PostType} from "@components/constants/enums";
import {EventPostModel} from "@models/collections/eventPost";
import {Model} from "mongoose";

export function GetPostModelByType(postType: PostType) {
  if (postType === PostType.EVENT) return EventPostModel
  if (postType === PostType.GENERAL) return EventPostModel
  else return EventPostModel
}

export function getCommentAuthorNameAndSave(post: any, userId: string) {
  post = JSON.parse(JSON.stringify(post))
  if (post.authorId === userId) return "Author"
  if (post.commentators.includes(userId)) return post.commentators.indexOf(userId) + 1;

  post.commentators.push(userId);
  post.save()
  return post.commentators.length;
}

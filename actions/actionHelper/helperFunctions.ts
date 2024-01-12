import {PostType} from "@components/constants/enums";
import {EventPostModel} from "@models/collections/eventPost";

export function GetPostModelByType(postType: PostType) {
  if (postType === PostType.EVENT) return EventPostModel
  if (postType === PostType.GENERAL) return EventPostModel
  else return EventPostModel
}

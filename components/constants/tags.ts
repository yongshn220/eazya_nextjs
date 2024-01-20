import {CommunityType, PostType, PostTypeURL} from "@components/constants/enums";


export enum ActionTag {
  USER_ACTIVITIES = "UserActivities"
}

export function getCommunityHomePath(postType: PostType, communityType: CommunityType) {
  return `/${PostTypeURL[postType]}/${communityType}`
}

export function getCommunityPostPath(postType: PostType, communityType: CommunityType, postId: string) {
  return `/${PostTypeURL[postType]}/${communityType}/${postId}`
}

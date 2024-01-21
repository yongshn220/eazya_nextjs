import {CommunityType, PostType, PostTypeEditURL, PostTypeURL} from "@components/constants/enums";


export enum ActionTag {
  USER_ACTIVITIES = "UserActivities",
  EVENT_POST_IDS = "EventPostIdsTag",
}

export function getPostTag(postType: PostType, postId: string) {
  return `${postType}/${postId}`

}

export function getPostIdsTag(postType: PostType, page: number) {
  return `${postType}/ids/${page}`
}


export function getHomePath(postType: PostType) {
  return `/${PostTypeURL[postType]}`
}

export function getPostPath(postId: string, postType: PostType) {
  return `/${PostTypeURL[postType]}/${postId}`
}

export function getEditFormPath(postId: string, postType: PostType) {
  return `/${PostTypeEditURL[postType]}/${postId}`
}

export function getCommunityHomePath(postType: PostType, communityType: CommunityType) {
  return `/${PostTypeURL[postType]}/${communityType}`
}

export function getCommunityPostPath(postId: string, postType: PostType, communityType: CommunityType) {
  return `/${PostTypeURL[postType]}/${communityType}/${postId}`
}

export function getCommunityEditFormPath(postId: string, postType: PostType, communityType: CommunityType) {
  return `/${PostTypeEditURL[postType]}/${postId}?type=${communityType}`
}



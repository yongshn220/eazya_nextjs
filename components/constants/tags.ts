import {CommunityType, PostType, PostTypeEditURL, PostTypeURL} from "@components/constants/enums";


export enum ActionTag {
  USER_ACTIVITIES = "UserActivities",
}

export function getPostTag(postId: string, postType: PostType) {
  return `${postType}/${postId}`
}

export function getPostIdsGroupTag(postType: PostType) {
  return `${postType}/ids`
}

export function getCommunityPostIdsGroupTag(postType: PostType, communityType: CommunityType) {
  return `${postType}/${communityType}/ids`
}

export function getPostIdsTag(postType: PostType, page: number) {
  return `${postType}/ids/${page}`
}

export function getCommunityPostIdsTag(postType: PostType, communityType: CommunityType, page: number) {
  return `${postType}/${communityType}/ids/${page}`
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



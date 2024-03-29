
export const FormMode = {
  CREATE: "Create ",
  EDIT:   "Edit",
}

export const UtilPath = {
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  ACTIVITY: "/my-activity",
}

export enum EmailType {
  VERIFY,
  RESET,
}

export enum NavTab {
  NONE =          "None",
  EVENT =         "Event",
  GENERAL =       "General",
  STORE =         "Store",
  FIND_MEMBER =   "Find Member",
  KNOWLEDGE_HUB = "Knowledge Hub",
}

export enum PostType {
  EVENT =       "Event",
  GENERAL =     "General",
  FIND_MEMBER = "Find Member",
  STORE =       "Store",
  KNOWLEDGE_HUB = "Knowledge Hub",
}

export enum CommunityPostType {
  GENERAL =     "General",
  FIND_MEMBER = "Find Member",
}

export const PostTypeURL = {
  [PostType.EVENT]:             "events",
  [PostType.GENERAL]:           "general",
  [PostType.FIND_MEMBER]:       "find-member",
  [PostType.STORE]:             "store",
  [PostType.KNOWLEDGE_HUB]:     "knowledge-hub",
}

export const PostTypeEditURL = {
  [PostType.EVENT]:             "edit-event-post",
  [PostType.GENERAL]:           "edit-general-post",
  [PostType.FIND_MEMBER]:       "edit-find-member-post",
  [PostType.STORE]:             "edit-store-post",
  [PostType.KNOWLEDGE_HUB]:     "edit-knowledge-hub-post",
}

export enum NotificationType {
  COMMENT_ON_POST =     "CommentOnPost",
  REPLY_ON_COMMENT =    "ReplyOnComment",
  REPLY_ON_REPLY =      "ReplyOnReply",
  UPVOTE_ON_POST =      "UpvoteOnPost",
  UPVOTE_ON_COMMENT =   "UpvoteOnComment",
  UPVOTE_ON_REPLY =     "UpvoteOnReply",
  DOWNVOTE_ON_POST =    "DownvoteOnPost",
  DOWNVOTE_ON_COMMENT = "DownvoteOnComment",
  DOWNVOTE_ON_REPLY =   "DownvoteOnReply",
  NONE =                "None"
}

export enum UserActivityMenu {
  ALL =           "All",
  EVENT =         "Event",
  GENERAL =       "General",
  FIND_MEMBER =   "Find Member",
  STORE =         "Buy & Sell"
}

export const ActivityToPostType = {
  [UserActivityMenu.ALL]: "",
  [UserActivityMenu.EVENT]: PostType.EVENT,
  [UserActivityMenu.GENERAL]: PostType.GENERAL,
  [UserActivityMenu.FIND_MEMBER]: PostType.FIND_MEMBER,
  [UserActivityMenu.STORE]: PostType.STORE,
}

export enum UserActivityType {
  CREATE_POST = "CreatePost",
  CREATE_COMMENT = "CreateComment",
  CREATE_REPLY = "CreateReply",
}

export enum StudentGroupType {
  EVERYONE = "Everyone",
  KOREAN = "Korean",
  CHINESE = "Chinese",
  INDIAN = "Indian",
  INTERNATIONAL = "International",
  EXCHANGE = "Exchange",
}

export enum KnowledgeType {
  GENERAL = "General",
  PROGRAMMING = "Programming",
}

export enum BaseType {
  ALL = "All",
  NONE = "None",
}

export type CommunityType = StudentGroupType | KnowledgeType | BaseType
export const CommunityTypeList = [...Object.values(StudentGroupType), ...Object.values(KnowledgeType)]

export enum VoteType {
  UP = "voteTypeUp",
  DOWN = "voteTypeDown",
  NONE = "voteTypeNone",
}

export function PostTypeToCommunityPostType(postType: PostType) {
  switch(postType) {
    case PostType.GENERAL: return CommunityPostType.GENERAL
    case PostType.FIND_MEMBER: return CommunityPostType.FIND_MEMBER
    default: return null
  }
}

export function isCommunityPostType(postType: PostType) {
  return Object.values(CommunityPostType).includes(PostTypeToCommunityPostType(postType))
}

export const FormMode = {
  CREATE: "Create ",
  EDIT:   "Edit",
}

export enum NavTab {
  NONE =          "None",
  EVENT =         "Event",
  GENERAL =       "General",
  STORE =         "Store",
  FIND_MEMBER =   "Find Member",
}

export enum PostType {
  EVENT =     "Event",
  GENERAL =   "General",
  STORE =     "Store",
  FIND_MEMBER = "Find Member",
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

export enum ActivityMenu {
  ALL =     "All",
  EVENT =   "Event",
  GENERAL = "General",
  STORE =   "Buy & Sell",
}

export enum UserActivityType {
  CREATE_POST = "CreatePost",
  CREATE_COMMENT = "CreateComment",
  CREATE_REPLY = "CreateReply",
}


export enum GeneralCommunityType {
  ENGLISH = "English",
  KOREAN = "Korean",
  CHINESE = "Chinese",
  INDIAN = "Indian",
  INTERNATIONAL = "International",
  EXCHANGE = "Exchange",
}

export enum VoteType {
  UP = "voteTypeUp",
  DOWN = "voteTypeDown",
  NONE = "voteTypeNone",
}

export function PostTypeToActivityMenu(postType: PostType) {
  switch(postType) {
    case PostType.EVENT: return ActivityMenu.EVENT
    case PostType.GENERAL: return ActivityMenu.GENERAL
    case PostType.STORE: return ActivityMenu.STORE
    default: return ActivityMenu.ALL
  }
}

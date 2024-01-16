export const FormMode = {
  CREATE: "Create ",
  EDIT: "Edit",
}

export enum PostType {
  EVENT = "Event",
  GENERAL = "General",
  STORE = "Store",
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

export const GeneralTag = {
  GENERAL: "General",
  INTERNATIONAL: "International",
  EXCHANGE: "Exchange",
  KOREAN: "Korean",
  CHINESE: "Chinese",
  INDIAN: "Indian",
}

export const GeneralMenuType = {
  ...GeneralTag,
  ALL: "All",
}

export enum VoteType {
  UP = "voteTypeUp",
  DOWN = "voteTypeDown",
  NONE = "voteTypeNone",
}

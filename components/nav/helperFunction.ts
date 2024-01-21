import {NotificationType} from "@components/constants/enums";

export function getMessageByNotificationType(type: NotificationType) {
  switch(type) {
    case NotificationType.COMMENT_ON_POST: return "Someone added a comment on your post."
    case NotificationType.REPLY_ON_COMMENT: return "Someone added a reply on your comment."
    case NotificationType.REPLY_ON_REPLY: return "Someone added a reply on your reply."
    case NotificationType.UPVOTE_ON_POST: return "Someone upvoted on your post."
    case NotificationType.UPVOTE_ON_COMMENT: return "Someone upvoted on your comment."
    case NotificationType.UPVOTE_ON_REPLY: return "Someone upvoted on your reply."
    case NotificationType.DOWNVOTE_ON_POST: return "Someone downvoted on your post."
    case NotificationType.DOWNVOTE_ON_COMMENT: return "Someone downvoted on your comment."
    case NotificationType.DOWNVOTE_ON_REPLY: return "Someone downvoted on your reply."
    default: return ""
  }
}

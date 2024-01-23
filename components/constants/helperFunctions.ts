import {IPost} from "@models/union/union";


export function getNumOfCommentsInPost(post: IPost) {
  let numberOfComments = 0
  post.comments.forEach(comment => {
    numberOfComments += comment.replies.length + 1
  })
  return numberOfComments
}


export function toElapsed(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = now.getTime() - past.getTime();

  if (elapsed < msPerMinute) {
    const seconds = Math.round(elapsed / 1000);
    return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
  } else if (elapsed < msPerHour) {
    const minutes = Math.round(elapsed / msPerMinute);
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  } else if (elapsed < msPerDay) {
    const hours = Math.round(elapsed / msPerHour);
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (elapsed < msPerMonth) {
    const days = Math.round(elapsed / msPerDay);
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (elapsed < msPerYear) {
    const months = Math.round(elapsed / msPerMonth);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  } else {
    const years = Math.round(elapsed / msPerYear);
    return years === 1 ? '1 year ago' : `${years} years ago`;
  }
}

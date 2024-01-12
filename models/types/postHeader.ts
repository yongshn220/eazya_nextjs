import {IEventPost} from "@models/collections/eventPost";

export interface IPostHeader {
  post: IEventPost | any;
  deletePostHandler: Function;
  createVoteHandler: Function;
  editHref: string;
}

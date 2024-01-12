import {IEventPost} from "@models/collections/eventPost";

export interface IPostHeader {
  post: IEventPost | any;
  postDeleteHandler: Function;
  deleteHref: string;
  editHref: string;
}

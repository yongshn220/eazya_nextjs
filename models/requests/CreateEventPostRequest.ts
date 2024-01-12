import {PostType} from "@components/constants/enums";

export interface CreateEventPostRequest {
  image: File;
  type: PostType;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

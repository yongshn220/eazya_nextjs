import {CommunityType, PostType} from "@components/constants/enums";

export interface CommunityFormRequest {
  postType: PostType;
  communityType: CommunityType;
  title: string;
  description: string;
}

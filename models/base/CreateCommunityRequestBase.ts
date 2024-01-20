import {CommunityType, PostType} from "@components/constants/enums";

export interface CreateCommunityRequestBase {
  postType: PostType;
  communityType: CommunityType;
  title: string;
  description: string;
}

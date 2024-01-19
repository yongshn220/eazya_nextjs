import {CommunityType} from "@components/constants/enums";

export interface CreateGeneralPostRequest {
  communityType: CommunityType;
  title: string;
  description: string;
}

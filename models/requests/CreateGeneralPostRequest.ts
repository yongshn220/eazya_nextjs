import {GeneralCommunityType} from "@components/constants/enums";

export interface CreateGeneralPostRequest {
  communityType: GeneralCommunityType;
  title: string;
  description: string;
}

import Post from "@components/post/Post";
import {GeneralCommunityType, PostType} from "@components/constants/enums";

export default function GeneralPost() {
  return (
    <Post type={PostType.GENERAL} post={{tag:GeneralCommunityType.INTERNATIONAL}}/>
  )
}

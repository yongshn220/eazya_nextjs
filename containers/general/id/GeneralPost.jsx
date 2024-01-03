import Post from "@components/post/Post";
import {GeneralTag, PostType} from "@components/constants/enums";

export default function GeneralPost() {
  return (
    <Post type={PostType.GENERAL} post={{tag:GeneralTag.INTERNATIONAL}}/>
  )
}

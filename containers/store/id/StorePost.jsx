import Post from "@components/post/Post";
import {GeneralTag, PostType} from "@components/constants/enums";

export default function StorePost() {
  return (
    <Post type={PostType.STORE} post={{tag:GeneralTag.INTERNATIONAL}}/>
  )
}

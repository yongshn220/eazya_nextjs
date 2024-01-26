import {model, models} from 'mongoose'
import {CommunityPostBase, ICommunityBase} from "@models/base/communityPostBase";


const FindMemberPostSchema = CommunityPostBase.clone()
export const FindMemberPostModel = models.FindMemberPost || model("FindMemberPost", FindMemberPostSchema)

export interface IFindMemberPost extends ICommunityBase {}

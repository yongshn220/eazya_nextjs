import { Schema, model, models } from 'mongoose'
import {CommunityPostBase, ICommunityBase} from "@models/base/communityPostBase";


const FindMemberPostSchema = new Schema({
  ...CommunityPostBase.obj,
})
export const FindMemberPostModel = models.FindMemberPost || model("FindMemberPost", FindMemberPostSchema)

export interface IFindMemberPost extends ICommunityBase {}

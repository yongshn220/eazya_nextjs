import { Schema, model, models } from 'mongoose'
import {CommunityPostBase, ICommunityBase} from "@models/base/communityPostBase";


const GeneralPostSchema = new Schema({
  ...CommunityPostBase.obj,
})
export const GeneralPostModel = models.GeneralPost || model("GeneralPost", GeneralPostSchema)

export interface IGeneralPost extends ICommunityBase {}

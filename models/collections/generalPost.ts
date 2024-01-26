import {model, models} from 'mongoose'
import {CommunityPostBase, ICommunityBase} from "@models/base/communityPostBase";


const GeneralPostSchema = CommunityPostBase.clone()

export const GeneralPostModel = models.GeneralPost || model("GeneralPost", GeneralPostSchema)

export interface IGeneralPost extends ICommunityBase {}

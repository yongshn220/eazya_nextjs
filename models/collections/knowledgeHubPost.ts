import {model, models} from 'mongoose'
import {CommunityPostBase, ICommunityBase} from "@models/base/communityPostBase";


const KnowledgeHubPostSchema = CommunityPostBase.clone()

export const KnowledgeHubPostModel = models.KnowledgeHubPost || model("KnowledgeHubPost", KnowledgeHubPostSchema)

export interface IKnowledgeHubPost extends ICommunityBase {}

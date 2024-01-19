import {IGeneralPost} from "@models/collections/generalPost";
import {IEventPost} from "@models/collections/eventPost";
import {IStorePost} from "@models/collections/storePost";
import {IFindMemberPost} from "@models/collections/findMemberPost";


export type IPost = IEventPost | IGeneralPost | IStorePost


export type ICommunityPost = IGeneralPost | IFindMemberPost

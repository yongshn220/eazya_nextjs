import {IGeneralPost} from "@models/collections/generalPost";
import {IEventPost} from "@models/collections/eventPost";
import {IStorePost} from "@models/collections/storePost";


export type IPost = IEventPost | IGeneralPost | IStorePost

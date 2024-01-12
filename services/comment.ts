import {Fetch} from '@services/index'
import {CreateCommentRequest} from "@models/requests/CreateCommentRequest";

const domain = '/api/comment'

export const createCommentApi = (req: CreateCommentRequest) => Fetch.post(domain +`/new`, req)

export const commentKey = {
  createCommentApi: "createCommentApi"
}

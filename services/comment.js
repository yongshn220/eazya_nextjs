import {Fetch} from '@services/index'

const domain = '/api/comment'

export const createCommentApi = (createCommentRequest) => Fetch.post(domain, `/new`, createCommentRequest)

export const commentKey = {
  createCommentApi: "createCommentApi"
}

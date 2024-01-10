import {Fetch} from '@services/index'

const domain = '/api/reply'

export const createReplyApi = (createReplyRequest) => Fetch.post(domain + `/new`, createReplyRequest)

export const replyKey = {
  createReplyApi: "createReplyApi"
}

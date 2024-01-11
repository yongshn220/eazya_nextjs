import {Fetch} from '@services/index'
import {CreateVoteRequest} from "@models/requests/CreateVoteRequest";

const domain = '/api/vote'

export const createVoteApi = (req: CreateVoteRequest) => Fetch.post(domain + '/new', req)

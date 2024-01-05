import {Fetch} from '@services/index'

const domain = '/api/event-post'

export const getEventPostIdsApi = (page) => Fetch.get(domain + `/ids?page=${page}`)

export const getEventPostApi = (id) => Fetch.get(domain + `/${id}`)

export const createEventPostApi = (eventPost) => Fetch.post(domain + `/new`, eventPost)


export const eventPostKey = {
  getEventPostIdsApi: "getEventPostIdsApi",
  createEventPostApi: "createEventPostApi",
  getEventPostApi: "getEventPostApi",
}

import {Fetch} from '@services/index'

const domain = '/api/event-post'

export const getEventPostIdsApi = async (page) => await Fetch.get(domain + `/ids?page=${page}`)
export const getEventPostApi = async (id) => await Fetch.get(domain + `/${id}`)
export const createEventPostApi = async (eventPost) => await Fetch.post(domain + `/new`, eventPost)
export const deleteEventPostApi = async (id) => await Fetch.delete(domain + `/${id}`)

export const eventPostKey = {
  getEventPostIdsApi: "getEventPostIdsApi",
  createEventPostApi: "createEventPostApi",
  getEventPostApi: "getEventPostApi",
  deleteEventPostApi: "deleteEventPostApi",
}

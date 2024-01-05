import {Fetch} from '@services/index'

export const getEventPostsApi = (page) => Fetch.get(`/api/event-post?page=${page}`)

export const postEventPostsApi = (eventPost) => Fetch.post(`/api/event-post/new`, eventPost)

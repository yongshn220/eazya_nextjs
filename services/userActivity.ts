import Fetch from "@services/index";


const domain = '/api/user-activity'

export const getUserActivitiesApi = async () => await Fetch.cget(domain)

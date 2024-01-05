export const Fetch = {
  get: async (uri) => {
    try {
      const response = await fetch(uri, {method: "GET"})
      if (response.ok) {
        return response.json()
      }
    }
    catch (error) {
      console.log(error)
      return false
    }
  },

  post: async (uri, data) => {
    try {
      const response = await fetch(uri, {
        method: "POST",
        body: JSON.stringify(data)
      })
      if (response.ok) {
        return true
      }
    }
    catch (error) {
      console.log(error)
      return false
    }
  },

  update: async (uri, id) => {},
  delete: async (uri, id) => {},
  patch: async (uri, id) => {},
}

export default Fetch



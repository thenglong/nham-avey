import axios from "axios"
import firebaseService from "src/services/firebase-service"

import { CONTENT_TYPE_JSON } from "./api-constants"

const api = axios.create({
  baseURL: process.env.NX_API_URL,
  headers: {
    "api-key": process.env.NX_API_KEY as string,
    "Content-Type": CONTENT_TYPE_JSON, // default to json
  },
})

api.interceptors.request.use(
  async config => {
    const token = await firebaseService.auth.currentUser?.getIdToken()
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export default api

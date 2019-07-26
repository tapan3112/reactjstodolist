import axios from 'axios'
// eslint-disable-next-line import/no-cycle
import { unAuthorized } from './helper'

const instance = axios.create({
  baseURL: 'http://5.189.157.11:8010/api'
})

instance.interceptors.response.use(response => response, (error) => {
  if (error.response && error.response.status === 401) {
    unAuthorized()
  }
  return Promise.reject(error)
})

export default instance

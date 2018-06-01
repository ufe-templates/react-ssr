import axios from 'axios'

const baseUrl = process.env.API_URL || 'http://localhost:3333'

const queryString = (url, params) => {
  if (params && Object.keys(params).length > 0) {
    const str = Object.keys(params).reduce((result, key) => {
      result += `&${key}=${params[key]}`
      return result
    }, '')
    return `${url}?${str.substr(1)}`
  }
  return url
}

export const get = (url, params) =>
  new Promise((resolve, reject) => {
    axios
      .get(queryString(`${baseUrl}/api${url}`, params))
      .then(resp => resolve(resp.data))
      .catch(reject)
  })

export const post = (url, data) =>
  new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/api${url}`, data)
      .then(resp => resolve(resp.data))
      .catch(reject)
  })

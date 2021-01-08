import axios from 'axios'
import { cache } from './cache'

export const client = axios.create({ baseURL: 'https://bad-api-assignment.reaktor.com/v2'})

const responseHandler = (response) => {
    if (response.config.method === 'GET' || 'get' || 'fetch' || 'FETCH') {
        if (response.config.url) {
            console.log('storing cache')
            cache.store(response.config.url, JSON.stringify(response.data))
        }
    }
    return response
}

const errorHandler = (error) => {
    if (error.headers.cached === true) {
        console.log('data cached')
        return Promise.resolve(error)
    }
    return Promise.reject(error)
}

const requestHandler = (request) => {
    if (request.method === 'GET' || 'get' || 'fetch' || 'FETCH') {
        const checkValidRes = cache.isValid(request.url || '')
        if (checkValidRes.isValid) {
            console.log('serving cached data')
            request.headers.cached = true
            request.data = JSON.parse(checkValidRes.value || '{}')
            return Promise.reject(request)
        }
    }
    return request
}

client.interceptors.request.use((request) => requestHandler(request))
client.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
)
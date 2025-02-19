import axios from 'axios'

const apiTransactions = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TRANSACTIONS_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const apiRates = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RATES_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const apiUsers = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USERS_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiTransactions.interceptors.request.use(
  config => {
    console.log('Request:', {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      headers: config.headers,
      data: config.data
    })
    return config
  },
  error => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

apiTransactions.interceptors.response.use(
  response => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    })
    return response
  },
  error => {
    console.error('Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    })
    return Promise.reject(error)
  }
)

export { apiTransactions }

import axios from 'axios'

const apiTransactions = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TRANSACTION_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const apiRates = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RATE_SERVICE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export { apiRates, apiTransactions }

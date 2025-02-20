import axios from 'axios'

const apiTransactions = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TRANSACTIONS_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const apiRates = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RATES_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export { apiRates, apiTransactions }

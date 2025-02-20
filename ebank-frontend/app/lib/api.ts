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

// Add a request interceptor
apiTransactions.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
apiTransactions.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // Prevent 400 errors from being logged to console
    if (error.response?.status === 400) {
      // You can handle specific error cases here
      // Or add custom logging/tracking
      return Promise.reject({
        ...error,
        silent: true // Add a flag to identify handled errors
      })
    }
    return Promise.reject(error)
  }
)

// Add a request interceptor
apiRates.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
apiRates.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // Prevent 400 errors from being logged to console
    if (error.response?.status === 400) {
      // You can handle specific error cases here
      // Or add custom logging/tracking
      return Promise.reject({
        ...error,
        silent: true // Add a flag to identify handled errors
      })
    }
    return Promise.reject(error)
  }
)

const apiErrorHandler = (error: any) => {
  let message: string[] = []

  if (error.response?.data?.code === 'VALIDATION-001') {
    if (error.response?.data?.path === 'uri=/api/v1/rates') {
      const originalMessage = error.response?.data?.message.replace(
        'Validation failed: ;',
        ''
      )

      const messages: string[] = originalMessage.split(';')
      messages.forEach(msg => {
        const field = msg.split(':')[0].trim()
        const errorMessage = msg.split(':')[1].trim()
        message.push('Validation Error: ' + errorMessage)
      })

      return message.join('\n')
    }
    if (error.response?.data?.path === 'uri=/api/v1/transactions') {
      const originalMessage = error.response?.data?.message.replace(
        'Validation failed: ;',
        ''
      )

      const messages: string[] = originalMessage.split(';')
      messages.forEach(msg => {
        const field = msg.split(':')[0].trim()
        const errorMessage = msg.split(':')[1].trim()
        message.push('Validation Error: ' + errorMessage)
      })

      return message.join('\n')
    }
  }

  return error
}

export { apiErrorHandler, apiRates, apiTransactions }

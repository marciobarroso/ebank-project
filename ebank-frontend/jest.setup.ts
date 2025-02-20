beforeAll(async () => {
  console.log('Running beforeAll...')
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI not set')
  }
})

afterAll(async () => {
  console.log('Running afterAll...')
})

afterEach(async () => {
  console.log('Running afterEach...')
})

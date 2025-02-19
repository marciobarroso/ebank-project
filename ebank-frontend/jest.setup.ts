import mongoose from 'mongoose'

beforeAll(async () => {
  console.log('Running beforeAll...')
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI not set')
  }
  await mongoose.connect(process.env.MONGODB_URI)
})

afterAll(async () => {
  console.log('Running afterAll...')
  await mongoose.disconnect()
})

afterEach(async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
})

import { MongoMemoryServer } from 'mongodb-memory-server'

export default async function globalSetup() {
  console.log('Running global setup...')
  const mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()
  console.log('MongoDB Memory Server URI:', uri)
  process.env.MONGODB_URI = uri
  // Save mongod instance globally so we can stop it in global teardown
  global.__MONGOD__ = mongod
}

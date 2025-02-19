export default async function globalTeardown() {
  console.log('Running global teardown...')
  const mongod = global.__MONGOD__
  if (mongod) {
    await mongod.stop()
  }
}

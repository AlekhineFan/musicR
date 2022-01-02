const db = require('../models/index')

async function connectToDb() {
  try {
    await db.mongoose.connect(
      db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    console.log('Connecting to database...')
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = connectToDb;
const uuid = require('uuid')
const sha256 = require('sha256')

function addSalt(password) {
  const salt = uuid.v1()
  const salted = `${password}.${salt}`
  return { salted, salt }
}

function generateSafePassword(rawPassword, saltFromDb = null) {
  if (saltFromDb) {
    console.log(`login attempt: ${rawPassword}.${saltFromDb}`)
    return {
      hashed: sha256(`${rawPassword}.${saltFromDb}`),
      salt: saltFromDb
    }
  }

  const { salted, salt } = addSalt(rawPassword)
  const hashed = sha256(salted)
  console.log('new signup:', hashed)

  return { hashed, salt }
}

module.exports = { addSalt, generateSafePassword }

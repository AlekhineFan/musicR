const db = require('../models/index')
const User = db.users
const { generateSafePassword } = require('../auth/passwords.js')

exports.createUser = async (email, password) => {
  try {
    const usersFound = await User.find({ email: email })
    if (usersFound.length > 0) {
      console.log('email in use', email)
      return null
    }
    const { hashed, salt } = generateSafePassword(password)
    const user = new User({
      email:email,
      password: hashed,
      salt: salt
    })
    await user.save()
    console.log('user created with email', email)
    return user._id
  } catch (err) {
    console.log('creating user failed', email, err)
    return null
  }
}

exports.login = async (email, rawPassword) => {
  let reason = null
  let userId = null

  try {
    const user = await User.find({ email: email })
    if (user.length > 0) {
      const { _id, password, salt } = user[0]
      const incomingPwWithSalt = generateSafePassword(rawPassword, salt)
      userId = _id

      if (password === incomingPwWithSalt.hashed) {
        reason = 'matching email and password found'
        return { userId, reason }
      } else {
        reason = 'password mismatch'
        return { userId, reason }
      }
    } else {
      reason = 'user not found by email'
      return { userId: null, reason }
    }
  } catch (err) {
    reason = err
  }

  return { userId, reason }
}

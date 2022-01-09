
const db = require('../models/index')
const { users: User, artists: Artist, vendees: Vendee, gigs: Gig } = db
const { generateSafePassword } = require('../auth/passwords')
const { LoginResult, SignupResult } = require('../enums/loginResults')

exports.createUserIfNotExists = async (email, password, isArtist) => {
  try {
    const usersFound = await User.find({ email: email })

    if (usersFound.length > 0) {
      console.log(SignupResult.EmailAlreadyUsed, email)
      return null
    }

    const { hashed, salt } = generateSafePassword(password)
    const newUser = new User({
      email:email,
      password: hashed,
      salt: salt
    })

    await newUser.save()

    if (isArtist) {
      const artist = new Artist({
        user: newUser._id
      })
      await artist.save()
      console.log(SignupResult.ArtistCreated)
    } else {
      const vendee = new Vendee({
        user: newUser._id
      })
      await vendee.save()
      console.log(SignupResult.VendeeCreated)
    }

    console.log(SignupResult.Success, email)
    return newUser._id
  } catch (err) {
    console.log(SignupResult.UserCreationFailure, email, err)
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
        reason = LoginResult.Success
        return { userId, reason }
      } else {
        reason = LoginResult.PasswordMismatch
        return { userId, reason }
      }
    } else {
      reason = LoginResult.EmailNotFound
      return { userId: null, reason }
    }
  } catch (err) {
    reason = err
  }

  return { userId, reason }
}

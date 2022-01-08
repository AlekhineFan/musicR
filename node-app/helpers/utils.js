const { mongoose } = require("../models")

exports.isNumeric = value => {
  return /^-?\d+$/.test(value)
}

exports.isObjectId = id => {
  return mongoose.Types.ObjectId.isValid(id)
}

exports.convertToObjectID = id => {
  return mongoose.Types.ObjectId(id)
}

exports.canProceedOnRoute = req => {
  const protectedRoutes = [
    'artist',
    'artists'
  ]
  const firstRouteElement = req.path.split('/')[1]
  const isProtected = protectedRoutes.includes(firstRouteElement)

  if (isProtected && !req.session.userId) return false
  return true
} 

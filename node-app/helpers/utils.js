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

const { mongoose } = require(".");

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      name: String,
      description: String,
    },
    {
      timestamps: true
    }
  )
  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Artist = mongoose.model('artist', schema)
  return Artist
}
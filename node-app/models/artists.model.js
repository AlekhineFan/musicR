module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      isActive: {
        type: Boolean,
        required: true,
        default: true
      },
      tags: {
        type: [String],
        default: []
      },
      links: {
        type: [String],
        default: []
      }
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
const User = require('./users.model')
const Gig = require('./gigs.model')

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.ObjectId,
        rel: User,
        required: true
      },
      name: {
        type: String,
        default: ""
      },
      description: {
        type: String,
        default: ""
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
      },
      gigs: {
        type: [mongoose.Schema.ObjectId],
        rel: Gig,
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
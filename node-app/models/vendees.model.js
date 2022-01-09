const User = require('./users.model')
const Gig = require('./gigs.model')

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.ObjectId,
        rel: User,
        default: ""
      },
      name: {
        type: String,
        default: ""
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

  schema.index = true

  const Vendee = mongoose.model('vendee', schema)
  return Vendee
}
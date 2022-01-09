const Artist = require('./artists.model')
const Vendee = require('./vendees.model')
const GigStatus = require('../enums/gigStatuses')

module.exports = mongoose => {
  const schema = mongoose.Schema(
    {
      artists: {
        type: mongoose.Schema.ObjectId,
        rel: Artist,
        default: null
      },
      vendee: {
        type: mongoose.Schema.ObjectId,
        rel: Vendee,
        required: true
      },
      status: {
        type: Number,
        default: GigStatus.Pending
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

  const Gig = mongoose.model('gig', schema)
  return Gig
}
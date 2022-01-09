const dbConfig = require('../config/db.config')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.users = require('./users.model')(mongoose)
db.artists = require('./artists.model')(mongoose)
db.vendees = require('./vendees.model')(mongoose)
db.gigs = require('./gigs.model')(mongoose)

module.exports = db
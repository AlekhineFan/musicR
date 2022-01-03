const { mongoose } = require('../models/index');
const db = require('../models/index')
const Artist = db.artists

exports.create = async (req) => {
  const { name, description } = req.body
  const artist = new Artist({
    name, 
    description
  });
  await artist.save();
  console.log('artist saved')
}
exports.findOne = async (id) => {
  const _id = convertToObjectID(id);
  const artist = await Artist.findById({ _id });
  return artist;
}
exports.findOneByName = (req, res) => {}
exports.updateOne = (req, res) => {}
exports.deleteOne = (req, res) => {}
exports.deleteAll = (req, res) => {}
exports.findAll = async () => {
  const artists = await Artist.find({});
  return artists;
}

function convertToObjectID(id) {
  return mongoose.Types.ObjectId(id);
}
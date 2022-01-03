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
exports.findOne = (req, res) => {}
exports.findOneByName = (req, res) => {}
exports.updateOne = (req, res) => {}
exports.deleteOne = (req, res) => {}
exports.deleteAll = (req, res) => {}
exports.findAll = async () => {
  const artists = await Artist.find({});
  return artists;
}
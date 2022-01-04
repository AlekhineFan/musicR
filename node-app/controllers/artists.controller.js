const { mongoose } = require('../models/index');
const db = require('../models/index')
const Artist = db.artists
const { isObjectId } = require('../helpers/utils.js')

exports.create = async (req) => {
  let isSaved;

  try {
    const { name, description, isActive, tags, links } = req.body
    const artist = new Artist({
      name, 
      description,
      isActive,
      tags,
      links
    });
    await artist.save();
    isSaved = true
  } catch (err) {
    console.log('could not save artist with name', name, err)
    isSaved = false
  }

  return isSaved;
}

exports.findByIdOrName = async (data) => {
  const isID = isObjectId(data)
  let artist = null
  
  try {
    if (isID) {
      console.log('looking for ID')
      const _id = convertToObjectID(data)
      artist = await Artist.findById({ _id })
    } else {
      console.log('looking for name')
      artist = await Artist.find({ name: data })
    }
  } catch (err) {
    console.log('could not find artist by id', id)
  }

  return artist
}

exports.updateOne = async (req) => {
  let updateSuccessful
  const updateObject = req.body
  const _id = convertToObjectID(updateObject)

  if (!_id) updateSuccessful;
  delete updateObject.id

  try {
    const artist = await Artist.findById({ _id: _id })
    for (const key of Object.keys(updateObject)) {
      artist.set(key, updateObject[key])
    }
    await artist.save()
    updateSuccessful = true
  } catch (err) {
    console.log('updating artist failed', req.body)
    updateSuccessful = false
  }

  return updateSuccessful
}

exports.softDeleteOne = async (id) => {
  let isSaved;
  const _id = convertToObjectID(id)

  try {
    const artist = await Artist.findById({ _id: _id })
    artist.set('isActive', false)
    await artist.save()
    isSaved = true
  } catch (err) {
    console.log('error soft deleting artist', id)
  }
  
  return isSaved
}

exports.findAll = async () => {
  const artists = await Artist.find({})
  return artists;
}

function convertToObjectID(id) {
  return mongoose.Types.ObjectId(id)
}
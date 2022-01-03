const express = require('express')
const cors = require('cors')
const connectToDb = require('./helpers/connectToDb')
const { create, findAll, findOne } = require('./controllers/artists.controller.js')

const app = express()
let corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

connectToDb().then(() => {
  console.log('successfully connected to database')
}).catch(err => { console.log('could not connect to database', err)})

app.get('/artists', async (req, res) => {
  console.log('find all artists...')
  const artists = await findAll()
  res.json(artists)
})

app.get('/artist/:id', async (req, res) => {
  console.log(`searching for artist with id: ${req.params.id}`)
  const artist = await findOne(req.params.id)
  res.json(artist)
})

app.post('/artists', async (req, res) => {
  console.log(req.body)
  await create(req)
  res.sendStatus(200)
})

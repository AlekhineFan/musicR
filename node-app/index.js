const express = require('express')
const cors = require('cors')
const cookiParser = require('cookie-parser')
const connectToDb = require('./helpers/connectToDb')
const { createArtist, findAll, findByIdOrName } = require('./controllers/artists.controller.js')
const { createUser, login } = require('./controllers/users.controller.js')

const app = express()
let corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookiParser())

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
  console.log(`searching for artist: ${req.params.id}`)
  const artist = await findByIdOrName(req.params.id)
  res.json(artist)
})

app.post('/artists', async (req, res) => {
  console.log(req.body)
  await createArtist(req)
  res.sendStatus(200)
})

app.post('/signup', async (req, res) => {
  const { email, password } = req.body
  const user = await createUser(email, password)
  const _id = user?._id
  if (!_id) {
    res.sendStatus(409)
  } else {
    res.send({_id})
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const loginResult = await login(email, password)

  if (!loginResult.loginSuccessful) {
    console.log(loginResult)
    res.sendStatus(403)
  } else {
    console.log('successful login:', email)
    res.cookie('user_id', loginResult._id, { httpOnly: true, maxAge: 3600000 })
    res.sendStatus(200)
  }
})

app.post('/signout', (req, res) => {
  res.clearCookie("user_id")
  res.redirect('/')
})

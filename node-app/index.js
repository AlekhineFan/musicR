const express = require('express')
const cors = require('cors')
const cookiParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const connectToDb = require('./helpers/connectToDb')
const { createArtist, findAll, findByIdOrName } = require('./controllers/artists.controller.js')
const { createUser, login } = require('./controllers/users.controller.js')
const { canProceedOnRoute } = require('./helpers/utils')

const app = express()
let corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookiParser())
app.use(cookieSession({ keys: ['ksjfg5jc8ss44lfdiel3y'] }))

app.use((req, res, next) => {
  if (!canProceedOnRoute(req)) {
    console.log('cannot proceed, route protected', req.path)
    res.sendStatus(403)
  } else {
    next()
  } 
})

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
  console.log(_id)
  if (!_id) {
    res.sendStatus(409)
  } else {
    req.session.userId = _id
    res.sendStatus(200)
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const loginResult = await login(email, password)
  const { userId } = loginResult

  if (!userId) {
    console.log(loginResult)
    res.sendStatus(403)
  } else {
    console.log('successful login:', email)
    req.session.userId = userId
    res.sendStatus(200)
  }
})

app.post('/signout', (req, res) => {
  req.session = null
  console.log("user signed out")
  res.sendStatus(200)
})

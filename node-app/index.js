const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const connectToDb = require('./helpers/connectToDb')
const { createArtist, findAll, findByIdOrName } = require('./controllers/artists.controller')
const { createUserIfNotExists, login } = require('./controllers/users.controller')
const { canProceedOnRoute } = require('./helpers/utils')

const app = express()
let corsOptions = {
  origin: "http://localhost:8081"
}

const rateLimitOption = {
  windowMs: 15 * 60 * 1000,
  max: 200
}

app.use(morgan('common'))
app.use(helmet())
app.use(rateLimit(rateLimitOption))
app.use(cors(corsOptions))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
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
  const { email, password, isArtist } = req.body
  const user = await createUserIfNotExists(email, password, isArtist)
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

app.use((req, res) => {
  res.sendStatus(400)
})

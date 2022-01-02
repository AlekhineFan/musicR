const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectToDb = require('./helpers/connectToDb')

const app = express()
let corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to MusicR!'
  })
})

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

connectToDb().then(() => {
  console.log('successfully connected to database')
}).catch(err => { console.log('could not connect to database', err)})

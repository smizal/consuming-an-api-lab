const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const axios = require('axios')

const port = process.env.PORT ? process.env.PORT : 5000

app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.post('/weather', async (req, res) => {
  console.log('Body', req.body['zip-code'])
  axios({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/weather?q=${req.body['zip-code']}&appid=${process.env.API_KEY}`
  })
    .then((response) => {
      console.log(response.data)
      res.render('weather/show.ejs', { data: response.data })
    })
    .catch((error) => {
      console.log(error)
    })
})
// https://api.openweathermap.org/data/2.5/weather?q=31824&appid=2136903356bbc9534e41e4ac2971d856

app.listen(port, () => {
  console.log(`Our app is running in port No. ${port}`)
})

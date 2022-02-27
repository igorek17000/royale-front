const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
app.use(express.json())
app.use(cors())
const token = '8dcfa1491f01d4804a588845685ad28fd2b8d2ef'

app.get('/stock/autocomplete/:ticker', (req, res) => {
  const ticker = req.params.ticker
  const url = `https://api.tiingo.com/tiingo/utilities/search?query=${ticker}&token=${token}`

  axios
    .get(url)
    .then((data) => {
      res.send(data.data)
      res.end()
    })
    .catch((err) => {
      console.log('err', err)
      res.end()
    })
})

module.exports = app

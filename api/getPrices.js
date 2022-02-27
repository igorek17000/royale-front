const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())
const token = '8dcfa1491f01d4804a588845685ad28fd2b8d2ef'

app.get('/forex/prices/:ticker', (req, res) => {
  const startDate = req.query.startDate
  const resampleFreq = req.query.resampleFreq
  const ticker = req.params.ticker
  // const url = `https://api.tiingo.com/tiingo/daily/${ticker}/prices?startDate=${startDate}&resampleFreq=${resampleFreq}&token=${token}`
  const url = `https://api.tiingo.com/tiingo/fx/${ticker}/prices?startDate=${startDate}&resampleFreq=${resampleFreq}&columns=open,high,low,close,volume&token=${token}`

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

const https = require('https')

const express = require('express')

const cors = require('cors')

const PORT = 3000
const API_KEY = '65a67da3dfc787dfb3774cf95aaaf64b'
const BASE_URL = 'https://api.themoviedb.org/3'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.end('Hello TMDB')
})

app.get('/search', (req, res) => {
  const { keyword } = req.query

  const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${keyword}`

  request(url, (error, result, resultText, buffer) => {
    if (error) return void res.end(error.message)

    res.json(result)
  })
})

const server = app.listen(PORT, () => {
  const { address, port } = server.address()

  console.log(`The server listening at: http://${address}:${port}`)
})

function request(url, callback) {
  const request = https
    .get(url, response => {
      const buffer = []

      response
        .on('data', data => {
          buffer.push(data)
        })
        .on('end', () => {
          const resultText = Buffer.concat(buffer).toString()
          const result = JSON.parse(resultText)

          callback(null, result, resultText, buffer)
        })
    })
    .on('error', error => {
      callback(error)
    })

  request.end()

  return request
}

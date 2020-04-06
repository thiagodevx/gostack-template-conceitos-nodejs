const express = require('express')
const cors = require('cors')
const { uuid } = require('uuidv4')

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

app.get('/repositories', (request, response) => {
  response.json(repositories)
})

app.post('/repositories', (request, response) => {
  const repository = { id: uuid(), ...request.body, likes: 0 }
  response.json(repository)
})

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params
  const { titulo, url, techs } = request.body
  const index = repositories.findIndex(repository => repository.id == id)
  const repository = { ...repositories[index], titulo, url, techs }
  repositories[index] = repository
})

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params
  const index = repositories.findIndex(repository => repository.id == id)
  repositories.splice(index, 1)
  response.status(204)
})

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params
  const index = repositories.findIndex(repository => repository.id == id)
  const repository = repositories[index]
  repository.like++
  response.json(repository)
})

module.exports = app

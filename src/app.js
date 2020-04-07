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
  repositories.push(repository)
  response.json(repository)
})

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params
  const { title, url, techs } = request.body
  const index = repositories.findIndex(repository => repository.id == id)
  if (index == -1) {
    response.status(400)
    response.end()
    return
  }
  const repository = { ...repositories[index], title, url, techs }
  repositories[index] = repository
  response.json(repository)
})

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params
  const index = repositories.findIndex(repository => repository.id == id)
  if (index == -1) {
    response.status(400)
    return response.json({})
  }
  repositories.splice(index, 1)
  response.status(204)
  return response.json({})
})

app.post('/repositories/:id/like', (request, response) => {
  const { id } = request.params
  const index = repositories.findIndex(repository => repository.id == id)
  if (index == -1) {
    response.status(400)
    response.end()
    return
  }
  const repository = repositories[index]
  repository.likes++
  console.log(repository.like)
  response.json(repository)
})

module.exports = app

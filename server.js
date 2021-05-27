const express = require('express')
const app = express()
const http = require('http')
const socket = require('socket.io')
const connection = require('./src/db/connection')
const route = require('./src/routes/polls/index')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static(__dirname + '/src/public'))
const server = http.createServer(app)

app.use('/api/polls', route)

const io = socket(server)


server.listen(5334, () => {
    console.log('listening on http://localhost:5334')
})

module.exports = {io}
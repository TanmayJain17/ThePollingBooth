const express = require('express')
const app = express()
const http = require('http')
const socket = require('socket.io')
const connection = require('./src/db/connection')
const route = require('./src/routes/polls/index')

const PORT = process.env.PORT || 5334
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', express.static(__dirname + '/src/public'))
const server = http.createServer(app)

app.use('/api/polls', route)

const io = socket(server)
let pollData = []

io.on('connection', (socket) => {
    console.log('connection made in id: ', socket.id)

    socket.on('addData', (data) => {
        pollData.push(data)
        socket.emit('dataReceived', { totalData: pollData })
    })

    socket.on('roomJoin', (data) => {

        socket.join(data.roomId) //socket-this

        socket.emit('roomJoined')

    })

    socket.on('btnClicked', (data) => {
        let clientPollId = data.pollId
        let clientOptionId = data.optionId


        //increasing total count first
        pollData.find(ele => ele.pollId == clientPollId).totalPeople += 1
        let totalNoClients = pollData.find(ele => ele.pollId == clientPollId).totalPeople
        //increasing the count of that option
        pollData.find(ele => ele.pollId == clientPollId).theOptions.find(ele => ele.id == clientOptionId).count += 1

        //updating the percent in the real data
        for (let eachOption of pollData.find(ele => ele.pollId == clientPollId).theOptions) {
            eachOption.percent = (eachOption.count / totalNoClients) * 100
        }
        let thisRoomData = pollData.find(ele => ele.pollId == clientPollId)
        let dataToSend = thisRoomData.theOptions

        /* console.log('btnclicked ', 'totalNoClients ', totalNoClients, ' RoomData ', thisRoomData) */
        //send data to every client in the room client
        io.to(clientPollId).emit('sendingRealData', { dataToSend })

    })



})



server.listen(5334, () => {
    console.log(`listening on http://localhost:${PORT}`)
})


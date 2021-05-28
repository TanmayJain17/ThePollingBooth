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
let pollData = []

io.on('connection', (socket) => {
    console.log('connection made in id: ', socket.id)

    socket.on('addData', (data) => {
        pollData.push(data)
        socket.emit('dataReceived', { totalData: pollData })
    })

    socket.on('roomJoin', (data) => {

        socket.join(data.roomId)

        socket.emit('roomJoined')

    })
    socket.on('optionClicked', (data) => {


        let theData = pollData.find(ele => ele.pollId == data.roomId)/*.totalPeople =  pollData.find(ele => ele.pollId == data.roomId).totalPeople + 1; */
        /* let thatFullData = pollData.find(ele => ele.pollId == data.roomId)
        let totalCount = thatFullData.totalPeople
        let thatOption = thatFullData.find(opt => opt.theOptions.find(clickId => clickId.id == data.optionId))

        pollData.find(ele => ele.pollId == data.roomId).find(opt => opt.theOptions.find(clickId => clickId.id == data.optionId)).count += 1

        thatOption.count += 1;
        for (let ele of thatFullData) {
            ele.theOptions.percent = (ele.theOptions.count / totalCount) * 100
        } */
        socket.emit('sendingData', { theData })
        //io.to(data.roomId).emit('sendingData', { theData })
    })



})



server.listen(5334, () => {
    console.log('listening on http://localhost:5334')
})


const {io} = require('../../server')

let pollData=[]

io.on('connection',(socket)=>{
    console.log('connection made in id: ',socket.id)

    socket.on('addData',(data)=>{
        pollData.push(data)
        socket.emit('dataReceived',{idCreated:data.pollId})
    })
    
    socket.on('roomJoin',(data)=>{
        
        socket.join(data.roomId)
        
        socket.emit('roomJoined')
        
    })
    socket.on('optionClicked',(data)=>{
        /* let totalCount = io.sockets.adapter.rooms[data.roomId].length; */
        
        let thatFullData = pollData.find(ele=>ele.pollId==data.roomId)
        
        thatFullData.totalPeople+=1;
        let totalCount = thatFullData.totalPeople
        let thatOption = thatFullData.find(opt=>opt.theOptions.find(clickId=>clickId.id==data.optionId))
        pollData.find(ele=>ele.pollId==data.roomId).find(opt=>opt.theOptions.find(clickId=>clickId.id==data.optionId)).count+=1
        thatOption.count+=1;
        for(let ele of thatFullData){
            ele.theOptions.percent = (ele.theOptions.count/totalCount)*100
        }
        io.to(data.roomId).emit('sendingData',{thatFullData})
    })
    /* let dataStored = []
    socket.on('optionClicked',(data)=>{
        let totalCount = io.sockets.adapter.rooms[data.roomId].length;
        if(totalCount==1){
            dataStored = data.otherOptions
        }
        let clickedId = data.optionId
        let thatOption = dataStored.find(ele=>ele.id==clickedId)
        thatOption.count +=1;
        for(let eachDataStored of dataStored){
            eachDataStored.push({percent:((eachDataStored.count/totalCount)*100)})
        } */
        /* let len = data.otherOptions.length */
       /*  socket.emit('percentReceived',{
            impData:dataStored
        })


   }) */

    
})
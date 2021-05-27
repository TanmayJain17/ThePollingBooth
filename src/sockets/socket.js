const {io} = require('../../server')

io.on('connection',(socket)=>{
    console.log('connection made in id: ',socket.id)
    
    socket.on('roomJoin',(data)=>{
        
        socket.join(data.roomId)
        socket.emit('roomJoined')
        
    })
    let dataStored = []
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
        }
        /* let len = data.otherOptions.length */
        socket.emit('percentReceived',{
            impData:dataStored
        })


   })

    
})
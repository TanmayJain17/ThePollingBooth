$(document).ready(
    function(){
        let socket = io()
        let buttons = $('button')
        let arrBtnCount = []
         for(let eachBtn of buttons){
            arrBtnCount.push({
                id:$(eachBtn).attr('id'),
                count:0
            })
        }
        
        /* console.log(arrBtnCount)  */
        socket.emit('roomJoin',{
            roomId:$('#content').data('pollId'),
            

        })
        socket.on('roomJoined')

        

        buttons.click((event)=>{
            buttons.attr('disabled','disabled');  //buttons disabled
            
            
            
            socket.emit('optionClicked',{
                roomId:$('#content').data('pollId'),
                otherOptions:arrBtnCount,
                optionId:$(event.target).attr('id')
            })
        })
        socket.on('sendingData',(data)=>{
            /* $('progress').style('display','block')
            for(let every of data){
               let theBar= $('progress').attr('id',every.theOptions.id)
               theBar.sttr('value',every.theOptions.percent)
            } */
            console.log(data)
        }) 

        
    }
)
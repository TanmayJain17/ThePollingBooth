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

        

        buttons.click((event)=>{
            buttons.attr('disabled','disabled');
            
            socket.emit('roomJoin',{
                roomId:$('#content').data('pollId'),
                

            })
            socket.on('roomJoined')
            socket.emit('optionClicked',{
                roomId:$('#content').data('pollId'),
                otherOptions:arrBtnCount,
                optionId:$(event.target).attr('id')
            })
        })
        socket.on('percentReceived',(data)=>{
            $('progress').style('display','block')
            let len = data.length
            for(let i=0;i< len;i++){
                $('progress')[i].attr('value',data[i].percent)
            }
        }) 

        
    }
)
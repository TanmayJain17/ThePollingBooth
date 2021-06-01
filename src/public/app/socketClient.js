$(document).ready(
    function () {
        let socket = io()
        let buttons = $('button')



        socket.emit('roomJoin', {
            roomId: $('#content').data('pollId'),
        })
        socket.on('roomJoined', () => {
            return 1
        })

        buttons.click((event) => {
            buttons.attr('disabled', 'disabled') //disable the buttons
            socket.emit('btnClicked', {
                optionId: $(event.target).attr('id'),
                pollId: $('#content').data('pollId')
            })
        })

        socket.on('sendingRealData', (data) => {
            let len = data.dataToSend.length;
            for (let i = 1; i <= len; i++) {
                $(`#prog${i}`).attr('value', `${data.dataToSend.find(ele => ele.id == i).percent}`)
                /* console.log($(`#prog${i}`)) */
                $(`#span${i}`).text(`${data.dataToSend.find(ele => ele.id == i).percent} %`)
            }
            $('progress').css('opacity', 1)

        })






    }
)
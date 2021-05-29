$(document).ready(
    function () {
        let socket = io()
        let question = $('#question')
        let option = $('#option')
        let btnAdd = $('#btnAdd')
        let btnSubmit = $('#btnSubmit')
        let listOption = $('#listOption')


        btnAdd.click(() => {
            if (option.val()) {
                let newOption = option.val()
                let listItem = $(`<li>${newOption}</li>`)
                listOption.append(listItem)
            }
            else {
                window.alert('option can not be null')
            }

        })

        btnSubmit.click(() => {
            let idReceived

            if (!(question.val()) || !($('li'))) {
                window.alert('need to have both options and question')
            }
            else {
                let array = $.makeArray($('li'))
                let len = array.length
                let newArray = []
                let sendArray = []
                for (let i = 0; i < len; i++) {
                    newArray[i] = { id: i + 1, name: array[i].textContent }
                    sendArray[i] = { id: i + 1, count: 0, percent: 0 }
                }
                let newQuestion = question.val()

                console.log(newQuestion, newArray)


                $.post('/api/polls', { pollQuestion: newQuestion, pollOptions: newArray }, (data) => {
                    $('#pollForm').html(`
                   <section class="hero is-small is-warning">
                    <div class="hero-body">
                      <p class="title">
                        Share Poll Id :
                      </p>
                      <p class="subtitle">
                        ${data}
                      </p>
                    </div>
                  </section>
                  `)
                    idReceived = `${data}`

                    socket.emit('addData', {
                        theOptions: sendArray,
                        pollId: idReceived,
                        totalPeople: 0
                    })


                })

            }
        })

        socket.on('dataReceived', (data) => {
            console.log(data.idCreated)
        })


    }
)
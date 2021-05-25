/* let socket = io() */


$(document).ready(
    function(){
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

        btnSubmit.click(()=>{
            
            
            if(!(question.val())||!($('li'))){
                window.alert('need to have both options and question')
            }
            else{
                let array = $.makeArray($('li'))
                let len = array.length
                let newArray = []
                for (let i = 0; i < len; i++){
                    newArray[i] = {id:i+1,name:array[i].textContent}
                } 
                let newQuestion = question.val()
                
                console.log(newQuestion,newArray)

                $.post('/api/polls',{pollQuestion:newQuestion, pollOptions:newArray},(data)=>{
                     $('body').append(`<a id=${data} href="">Go to the live poll</a>`) 
                   
                })
            }
        })

    } 
) 
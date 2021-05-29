let btnMakePoll = $('#btnMakePoll')
btnMakePoll.click(() => {
    $('#content').load('../components/makePoll.html')
})
let btnGoToPoll = $('#btnGoToPoll')
btnGoToPoll.click(() => {
    if (!($('#theId').val())) {
        window.alert('enter the poll id')
    }
    else {
        $('#content').data('pollId', $('#theId').val())
        $('#content').load('../components/pollPage.html') //?id=${$('#theId').val()}
    }
})
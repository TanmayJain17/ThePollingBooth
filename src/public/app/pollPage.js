let theId = $('#content').data('pollId')

$.get(`/api/polls/${theId}`, (data) => {
    $('#pollQuestion').html(`
    <div class="column">
    <section class="hero is-small mt-5 mb-1 is-link">
        <div class="hero-body">
            <p class="title">
                ${data.question}
            </p>
            
        </div>
    </section>
    </div>
    `)
    let theOptions = data.options
    for (let every of theOptions) {
        $('#pollOptions').append(`<div class="section"><button class="button is-success is-light is-large" id=${every.id}>${every.name}</button>
        
        <progress id=${every.id} style="display:none;" class="mt-1 progress is-danger is-small" value="0" max="100">45%</progress>
        </div>
        `)
    }
})

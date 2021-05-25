const route = require('express').Router();
const {getPoll,postPoll} = require('../../controller/polls')

route.get('/:id', async (req, res) => {
    try {


        let thePollId = req.params.id
        const thisPoll = await getPoll(thePollId)
        if (thisPoll) {
            res.status(200).send(thisPoll)
        }
        else {
            res.status(400).send('could not find the poll that you are looking for')
        }




    }
    catch (err) {
        console.error(err)
    }
})

route.post('/', async (req, res) => {
    
    let { pollQuestion, pollOptions } = req.body
    
    if (!(pollQuestion) || !(pollOptions)) {
        return res.status(401).send('need the poll-question and the options')
    }
    
    else {
        const thePollId = await postPoll(pollQuestion, pollOptions)
        res.status(201).send(thePollId)
    }

})
module.exports = route 
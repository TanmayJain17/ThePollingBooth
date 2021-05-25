const {pollModel} = require('../db/modelSchema')

/* const pollModel = mongoose.model('pollModel') */

async function getPoll(id){

    try{
        const thePoll = await pollModel.findById(id,(err,docs)=>{
            if(err){
                console.err(err)
            }
            else{
                console.log(docs)      //console.log(docs[0]._id)
            }
        })
        return thePoll
    }
    catch(err){
        console.error(err)
    }
}

async function postPoll(theQuestion,theOptions){
    try{
       const thePoll = await new pollModel({
        question:theQuestion,
        options : theOptions
       })

       await thePoll.save((error)=>{
           console.error(error)
       })
       const pollId = await thePoll.getId()

        return pollId
       /* console.log(pollId) */
       
       
    }
    catch(err){
        console.error(err)
    }
}

/* testing
 postPoll()
getPoll() */
module.exports = {getPoll,postPoll}
 
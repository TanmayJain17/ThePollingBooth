const mongoose = require('mongoose')
/* const {pollModel} = require('./modelSchema') */
const mongoDbUrl = process.env.MONGODB_URI ||'mongodb://localhost:27017/yourpoll'
mongoose.connect(mongoDbUrl,{useNewUrlParser:true,useUnifiedTopology: true},(error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log('successfully connected')
    }
})
module.exports = mongoose

/* module.exports = {pollModel} */ 
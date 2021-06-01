const mongoose = require('mongoose')
/* const {pollModel} = require('./modelSchema') */
const mongoDbUrl = process.env.MONGODB_URL ||'mongodb://localhost:27017/mypoll'
mongoose.connect(mongoDbUrl,{useNewUrlParser:true,useUnifiedTopology: true},(error)=>{
    if(error){
        console.error(error)
    }
    else{
        console.log('successfully connected')
    }
})
module.exports = mongoose

/* module.exports = {pollModel} */ 
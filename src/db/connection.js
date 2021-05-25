const mongoose = require('mongoose')
/* const {pollModel} = require('./modelSchema') */

mongoose.connect('mongodb://localhost:27017/mypoll',{useNewUrlParser:true,useUnifiedTopology: true},(error)=>{
    if(error){
        console.error(error)
    }
    else{
        console.log('successfully connected')
    }
})
module.exports = mongoose

/* module.exports = {pollModel} */
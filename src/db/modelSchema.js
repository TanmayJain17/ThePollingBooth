const mongoose = require('./connection')

const pollSchema = new mongoose.Schema({
    
    question:{
        type:String,
        required:"Required"
    },
    options:{
        type:Array,
        required:"Required"
    }
})

pollSchema.methods.getId = function () {
    const id = this._id
      ? this._id
      : "NoId";
    return id
  }

const pollModel = mongoose.model("pollModel",pollSchema)

module.exports = {pollModel}
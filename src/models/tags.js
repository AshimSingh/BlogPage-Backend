const mongoose = require('mongoose')

const tagsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    slug:{
        type:String,
        required: true,
    },
    description:{
        type:String,
    }

})
module.exports = mongoose.model('Tags',tagsSchema)
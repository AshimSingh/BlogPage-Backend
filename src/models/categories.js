const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required:true
        },
        description: {
            type: String,
            // required: true
        },
        slug:{
            type:String,
            required:true
        },
        thumbnail:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Media'
        }
    }
)
module.exports = mongoose.model('Categories',categoriesSchema)
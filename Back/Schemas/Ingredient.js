const mongoose = require('mongoose')

const IngredientSchemas = mongoose.Schema({
    name: String,
    quantity:Number,
    status:String,
    create_At:{
        type: Date,
        default: new Date()
    }
})

module.exports.IngredientSchemas = IngredientSchemas
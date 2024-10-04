const mongoose = require('mongoose')
const IngredientSchemas = require('../Schemas/Ingredient').IngredientSchemas

const Ingredient = mongoose.model('Ingredient', IngredientSchemas)

module.exports.CookService = class CookService{
    static async createIngredients(ingredient, callback){
        console.log(ingredient)
        const newIngredient = new Ingredient(ingredient)
        const error = newIngredient.validateSync()
        if(error){
            callback({msg: "ingredient n'est pas au bon format", type_error:"no-valid"})
        }else{
            try{
                setTimeout(async ()=> {    
                    await newIngredient.save()
                    console.log('enregistrement de la recette dans la base de donnée')
                    
                },1300)
                setTimeout(()=>{console.log('déplacement des recettes dans le frigo')}, 2000)
                setTimeout(()=>{
                    console.log('envoie de la data au front')
                    console.log(newIngredient)
                    callback(null, newIngredient)
                },3000)
            }catch(err){
                callback({msg:"une erreur c'est produite lors de l'enregistrement de l'ingredient", type_error:"no-valid"})
            }
        }
    }
}
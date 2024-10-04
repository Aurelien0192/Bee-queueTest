const CookService = require('../Services/cookService').CookService
const queue = require('../Utils/queue').queue

module.exports.CookController = class CookController{
    static createIngredients(req, res){
        console.log(req)
        queue.createJob(req.body).save()
        res.statusCode = 202
        res.send({msg: 'job created'})
    }
}
const Queue = require('bee-queue');
const cookService = require('../Services/cookService').CookService
const io = require('../server').io

const options = {
    removeOnSuccess: true,
    redis: {
        host: process.env.URL_REDIS,
        port: process.env.PORT_REDIS,
    },
}

const cookQueue = new Queue('cook', options);

cookQueue.process((job, done) => {
    cookService.createIngredients(job.data, function(err, value){
        if(err){
            io.emit(job.data.fingerPrint, value)
            done(err)
        }else{
            io.emit(job.data.fingerPrint, value)
            done(null, value)
        }
    })
});

cookQueue.on('failed', (job, err) => {
    io.emit(job.data.fingerPrint, err)
})

module.exports.queue = cookQueue;
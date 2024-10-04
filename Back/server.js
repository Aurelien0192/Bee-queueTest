const express = require("express")
const bodyParser = require("body-parser")
const { createServer } = require('http')
const database = require('./Middleware/database')
const Logger = require('./Utils/logger').logger.pino
const {Server} = require('socket.io')
const cors = require('cors')

require('dotenv').config()

const app = express()
const server = createServer(app)
module.exports.io = io = new Server(server, {
    cors: {
        origin: "*", // L'origine autorisée (ton serveur React)
        methods: ["GET", "POST"], // Méthodes HTTP autorisées
        credentials: true          // Autoriser les cookies, tokens, etc.
    }
})

require('./Utils/database')

//set Header to resolve CORS problems
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


const CookController = require('./Controller/cookController').CookController
app.use(bodyParser.json())

app.post('/cook', database.controlsBDD, CookController.createIngredients)

io.on('connection', (socket) => {
    console.log('Client connecté:', socket.id);
    
    socket.on('disconnect', () => {
        console.log('Client déconnecté:', socket.id);
    });
});



server.listen(process.env.PORT, () => {
    Logger.info(`Serveur démarré sur le port ${process.env.PORT}.`)
})

module.exports = app
const express = require('express')
var cors = require('cors')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.usersPath = '/api/users'

        this.middlewares()

        this.routes()
    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user.route'))
    }

    listen() {
        this.app.listen(this.port, () => console.log('Escuchando el puerto ' + this.port))
    }
}


module.exports = Server
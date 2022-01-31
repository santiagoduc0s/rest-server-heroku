const { request, response } = require('express')

const index = (req = request, res = response) => {

    res.json([
        {
            name: 'santiago',
            email: 'santidu200@gmail.com'
        },
        {
            name: 'juan',
            email: 'jgarcia@gmail.com'
        }
    ])
}

const store = (req = request, res = response) => {
    res.json(req.body)
}

const update = (req = request, res = response) => {
    console.log(req.params)
    res.json({
        params: req.params,
        query: req.query
    })
}

const destroy = (req = request, res = response) => {
    res.json({
        params: req.params,
        query: req.query
    })
}

module.exports = {
    index,
    store,
    update,
    destroy,
}
const { request, response } = require('express')
const bcrypt = require('bcryptjs')

const User = require('../models/user');
const { countDocuments } = require('../models/user');

const index = async (req = request, res = response) => {

    const query = { active: true }

    const { limit = 5, page = 0 } = req.query;
    const usersPromise = User.find(query)
        .limit(Number(limit))
        .skip(Number(page))

    const countUsersPromise = User.countDocuments(query)

    const [ users, countUsers ] = await Promise.all([ usersPromise, countUsersPromise ])

    res.json({ countUsers, users })
}

const store = async (req = request, res = response) => {

    const { google, ...body } = req.body
    body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync());

    const user = new User(body)
    await user.save({ body })
    res.json(user)
}

const update = async (req = request, res = response) => {
    const { id } = req.params
    const { _id, password, google, ...body } = req.body

    console.log(body);

    if (password) {
        body.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    }

    const user = await User.findByIdAndUpdate(id, body);

    res.json(user)

    // res.json({
    //     params: req.params,
    //     query: req.query,
    //     bosy: req.body,
    // })
}

const destroy = async (req = request, res = response) => {

    const { id } = req.params
    // const user = await User.findByIdAndDelete(id)
    const user = await User.findByIdAndUpdate(id, {active: false})
    res.json(user)
}

module.exports = {
    index,
    store,
    update,
    destroy,
}
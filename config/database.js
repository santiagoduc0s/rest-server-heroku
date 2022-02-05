const mongoose = require('mongoose')

const bdConnection = async () => {

    try {
        
        await mongoose.connect(process.env.MONGO_CONNECTION)

        console.log('Success database connection');

    } catch (err) {
        console.log(err)
        throw new Error('Error database connection')
    }
}

module.exports = { bdConnection }
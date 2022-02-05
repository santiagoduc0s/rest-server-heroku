const { check } = require( 'express-validator' )

const User = require( '../models/user' )
const Role = require( '../models/role' )

const { end } = require( './index' )

const roleValidate = async ( rol = '' ) => {
    if ( !await Role.findOne( { name: rol } ) ) {
        throw new Error( `The role ${ rol } is invalid or it's not registered` )
    }
}

const emailUniqueValidate = async ( email = '' ) => {
    if ( await User.findOne( { email } ) ) {
        throw new Error( `The email ${ email } it already exists` )
    }
}

const idValidate = async ( id ) => {
    if ( !await User.find( { id } ) ) {
        throw new Error( 'Does not exist user with that id' )
    }
}

const emailChangeValidate = async ( email, { req } ) => {

    const user = await User.findOne( { email } )

    if ( user ) {
        if ( user.id != req.params.id ) {
            throw new Error( `The email ${ email } it already exists` )
        }
    }
}

const storeMiddleware = [
    check( 'name', 'The name is require' )
        .not().isEmpty(),

    check( 'email', 'The email is invalid' )
        .isEmail()
        .custom( ( email ) => emailUniqueValidate( email ) ),

    check( 'password', 'The password is required and must be greater than 8 characters' )
        .not().isEmpty()
        .isLength( { min: 8 } ),

    // check('role', 'The role is required').isIn(['ROLE_USER', 'ROLE_ADMIN']),
    check( 'role', 'The role is required' )
        .custom( roleValidate ),

    end,
]


const updateMiddleware = [
    check( 'id', 'the id is invalid' )
        .isMongoId()
        .custom( ( id ) => idValidate( id ) ),

    // check('id', 'the id is invalid')
    //     .custom((id) => idValidate(id)),

    check( 'name', 'The name is require' )
        .not().isEmpty(),

    check( 'email', 'The email is invalid' )
        .isEmail()
        .custom( emailChangeValidate ),

    check( 'password', 'The password is required and must be greater than 8 characters' )
        .not().isEmpty()
        .isLength( { min: 8 } ),

    check( 'role', 'The role is required' )
        .custom( roleValidate ),

    async ( req, res, next ) => {
        end( req, res, next )
    }
]


const deleteMiddleware = [
    check( 'id', 'the id is invalid' )
        .isMongoId()
        .custom( ( id ) => idValidate( id ) ),

    end
]


module.exports = {
    storeMiddleware,
    updateMiddleware,
    deleteMiddleware,
}
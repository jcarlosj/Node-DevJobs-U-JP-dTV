const
    bcrypt = require( 'bcrypt' ),
    mongoose = require( 'mongoose' );

mongoose.Promise = global.Promise;


const usersSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    token: String,
    expirationDate: Date
});

// ! Antes de guardar
usersSchema.pre( 'save', async function( next ) {
    // ! Valida si el password esta hasheado (encriptado)
    if( ! this.isModified( 'password' ) ) 
        return next();
    
    const hash = await bcrypt.hash( this.password, 9 );
    this.password = hash;
    next();

});
// ! Posterior a guardar
usersSchema.post( 'save', async function( error, doc, next ) {
    // console.error( error );  // ! MongoServerError: E11000 duplicate key error collection: devjobs.users index: email_1 dup key: { email: "evasofia@correo.co" }

    /** Valida que exista un error especifico para personalizar el mensaje de error  */
    if( error.name === 'MongoServerError' && error.code === 11000 )
        next( 'Correo ya está registrado!' );
    else
        next( error );
});


module.exports = mongoose.model( 'Users', usersSchema );
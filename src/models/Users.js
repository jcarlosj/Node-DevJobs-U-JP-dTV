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


module.exports = mongoose.model( 'Users', usersSchema );
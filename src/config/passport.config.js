const
    passport = require( 'passport' ),
    LocalStrategy = require( 'passport-local' ).Strategy,
    mongoose = require( 'mongoose' ),
    Users = mongoose.model( 'Users' );


    passport.use( new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, async ( email, password, done ) => {
    const userFound = await Users.findOne({ email });

    if( ! userFound ) {
        return done(
            null,           // Mensaje de error
            false,          // Usuarios
            {
                message: 'El usuario no existe'
            }   
        );
    }

    // Si el usuario existe verificamos la contraseña
    const isValidPassword = userFound.comparePassword( password );

    if( ! isValidPassword ) {
        return done(
            null,           // Mensaje de error
            false,          // Usuarios
            {
                message: 'Contraseña incorrecta!'
            }   
        );
    }

    return done( null, userFound );     // El usuario existe y la contraseña es valida  
}) );


passport.serializeUser( ( user, done ) => done( null, userFound._id ) );

passport.deserializeUser( async( id, done ) => {
    const userFound = await Users.findById( id ).exec();

    return done( null, userFound );
});


module.exports = passport;
const Users = require( '../models/Users' );

exports.formCreateAccount = ( req, res, next ) => {
    res.render( 'form-create-account', {
        siteName: 'Crea tu cuenta en devjobs',
        namePage: 'Crear cuenta',
        tagLine: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    });
}

exports.createNewUser = async ( req, res, next ) => {
    const
        user = new Users( req.body ),
        newUser = await user.save();

    if( ! newUser )
        return next();

    res.redirect( '/iniciar-sesion' );
    
}
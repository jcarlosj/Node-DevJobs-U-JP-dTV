const { body, validationResult } = require( 'express-validator' );

const Users = require( '../models/Users' );

exports.formCreateAccount = ( req, res, next ) => {
    res.render( 'form-create-account', {
        siteName: 'Crea tu cuenta en devjobs',
        namePage: 'Crear cuenta',
        tagLine: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    });
}

exports.validateFormCreateAccount = async ( req, res, next ) => {
    //sanitizar los campos
    const rules = [
        body( 'fullname') 
            .not().isEmpty()
            .withMessage( 'El nombre es obligatorio' )
            .escape(),
        body( 'email' )
            .not().isEmpty()
            .withMessage( 'El email es obligatorio' )
            .isEmail()
            .withMessage( 'El email debe ser un formato válido' )
            .normalizeEmail(),
        body( 'password' )
            .not().isEmpty()
            .withMessage( 'La contraseña es obligatoria' )
            .escape(),
        body( 'confirmPassword' )
            .not().isEmpty()
            .withMessage( 'Confirmar la contraseña es obligatorio' )
            .equals( req.body.password )
            .withMessage( 'Las contraseñas suministradas no son iguales' )
            .escape()
    ];
 
    await Promise.all( rules.map( validation => validation.run( req ) ) );
    
    const errors = validationResult( req );

    console.info( req.body ); 
    console.log( 'ERRORS: ', errors ); 
    // return;
    
    // Valida si hay errores en los campos del formulario
    if ( ! errors.isEmpty() ) {
        
        // ! La estructura generada por express validator es un array de objectos como el siguiente
        // [
        //     {
        //         value: '',
        //         msg: 'El nombre es obligatorio',
        //         param: 'fullname',
        //         location: 'body'
        //     }
        // ]

        // ! Mapeamos todos los mensajes de error existentes y los agregamos a req.flash.error
        req.flash( 'error', errors.array().map( error => error.msg ) );     // ! Extrae el mensaje de la propiedad error.msg a req.flash.error
        
        res.render( 'form-create-account', {
            siteName: 'Crea tu cuenta en devjobs',
            namePage: 'Crear cuenta',
            tagLine: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
            messages: req.flash()      // Envia array con todos los mensajes de error bajo la propiedad 'error'
        });

        return;
    }

    next();     // Continua si no hay errores
}

exports.createNewUser = async ( req, res, next ) => {
    const user = new Users( req.body );
        
    try {
        newUser = await user.save();
        
        res.redirect( '/iniciar-sesion' );
    }
    catch( error ) {
        req.flash( 'error', error );    // ! Agrega el error a req.flash.error

        res.redirect( '/crear-cuenta' );
    }

}
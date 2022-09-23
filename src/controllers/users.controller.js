exports.formCreateAccount = ( req, res, next ) => {
    res.render( 'form-create-account', {
        siteName: 'Crea tu cuenta en devjobs',
        namePage: 'Crear cuenta',
        tagLine: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta'
    });
}
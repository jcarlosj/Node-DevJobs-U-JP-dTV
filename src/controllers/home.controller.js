exports.showJobOffers = ( req, res ) => {
    res.render( 'home', {
        siteName: 'devJobs',
        namePage: 'Inicio',
        tagLine: 'Encuentra y Pública Trabajos para Desarrolladores Web',
        barra: true,
        boton: true
    });
}
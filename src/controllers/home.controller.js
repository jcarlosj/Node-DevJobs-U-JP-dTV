const
    mongoose = require( 'mongoose' ),
    Vacant = mongoose.model( 'Vacancies' );

exports.showJobOffers = async ( req, res, next ) => {
    const vacancies = await Vacant.find().lean();   // ! lean: Omite la creación de instancias de un documento completo de Mongoose (Object Mongoose => Object POJO) 
                                                    // !       https://mongoosejs.com/docs/tutorials/lean.html

    if( ! vacancies ) return next();

    // console.log( vacancies );

    res.render( 'home', {
        siteName: 'devJobs',
        namePage: 'Inicio',
        tagLine: 'Encuentra y Pública Trabajos para Desarrolladores Web',
        barra: true,
        boton: true,
        session: JSON.stringify( req.session ),
        vacancies
    });
}
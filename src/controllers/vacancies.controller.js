const
    mongoose = require( 'mongoose' ),
    Vacant = mongoose.model( 'Vacancies' );

/** or 
 *  const Vacant = require( '../models/Vancancies' );
 * 
*/

exports.formNewVacancy = ( req, res ) => {

    res.render( 'form-new-vacancy', {
        siteName: 'devJobs',
        namePage: 'Nueva vacante',
        tagLine: 'Llena el formulario y publica tu vacante'
    });

}

exports.addNewVacancy = async ( req, res ) => {
    const vacant = new Vacant( req.body );

    vacant.skills = req.body.skills.split( ',' );   /** Guarda skills como un arreglo no como una cadena */
    const newVacant = await vacant.save();          /** Guarda cambios de la nueva entidad Vacant en la base de datos */
    res.redirect( `/vacantes/${ newVacant.url }` );  /** Redirecciona a la url recien generada y guardada */

}

exports.showDetailVacant = async ( req, res, next ) => {
    const vacant = await Vacant
                            .findOne({ url: req.params.url })
                            .lean();    // ! lean: Omite la creación de instancias de un documento completo de Mongoose (Object Mongoose => Object POJO) 
                                        // !       https://mongoosejs.com/docs/tutorials/lean.html;

    if( ! vacant ) return next();

    res.render( 'vacant', {
        siteName: vacant.title,
        namePage: vacant.title,
        barra: true,
        vacant
    });
}

exports.formEditVacancy = async ( req, res, next ) => {
    const vacant = await Vacant
                            .findOne({ url: req.params.url })
                            .lean();    // ! lean: Omite la creación de instancias de un documento completo de Mongoose (Object Mongoose => Object POJO) 
                                        // !       https://mongoosejs.com/docs/tutorials/lean.html;

    if( ! vacant ) return next();

    res.render( 'form-edit-vacancy', {
        siteName: `Editar - ${ vacant.title }`,
        namePage: vacant.title,
        barra: true,
        vacant
    });
}
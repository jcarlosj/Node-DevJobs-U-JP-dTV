const
    mongoose = require( 'mongoose' ),
    Vacant = mongoose.model( 'Vacancies' );

/** or 
 *  const Vacant = require( '../models/Vancancies' );
 * 
*/

exports.formNewVacancy = ( req, res ) => {
    res.render( 'formNewVacancy', {
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
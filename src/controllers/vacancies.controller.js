exports.formNewVacancy = ( req, res ) => {
    res.render( 'formNewVacancy', {
        siteName: 'devJobs',
        namePage: 'Nueva vacante',
        tagLine: 'Llena el formulario y publica tu vacante'
    });
}
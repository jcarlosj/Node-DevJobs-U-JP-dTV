const
    express = require( 'express' ),
    router = express.Router(),
    homeController = require( '../controllers/home.controller' ),
    vacanciesController = require( '../controllers/vacancies.controller' );

module.exports = () => {
    router.get( '/', homeController.showJobOffers );
    router.route( '/vacantes/nueva' )
        .get( vacanciesController.formNewVacancy )
        .post( vacanciesController.addNewVacancy );
    router.get( '/vacantes/:url', vacanciesController.showDetailVacant );
    router.get( '/vacantes/editar/:url', vacanciesController.formEditVacancy );

    return router;
}
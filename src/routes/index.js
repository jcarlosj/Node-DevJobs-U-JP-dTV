const
    express = require( 'express' ),
    router = express.Router(),
    homeController = require( '../controllers/home.controller' ),
    vacanciesController = require( '../controllers/vacancies.controller' );

module.exports = () => {
    router.get( '/', homeController.showJobOffers );
    router.get( '/vacantes/nueva', vacanciesController.formNewVacancy );

    return router;
}
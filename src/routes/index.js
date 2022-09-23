const
    express = require( 'express' ),
    router = express.Router(),
    homeController = require( '../controllers/home.controller' ),
    vacanciesController = require( '../controllers/vacancies.controller' ),
    usersController = require( '../controllers/users.controller' );

module.exports = () => {
    router.get( '/', homeController.showJobOffers );
    router.route( '/vacantes/nueva' )
        .get( vacanciesController.formNewVacancy )
        .post( vacanciesController.addNewVacancy );
    router.get( '/vacantes/:url', vacanciesController.showDetailVacant );
    router.route( '/vacantes/editar/:url' )
        .get( vacanciesController.formEditVacancy )
        .post( vacanciesController.updateVacancy );
    router.get( '/crear-cuenta', usersController.formCreateAccount );

    return router;
}
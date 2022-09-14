const
    express = require( 'express' ),
    router = express.Router(),
    homeController = require( '../controllers/home.controller' );

module.exports = () => {
    router.get( '/', homeController.showJobOffers );

    return router;
}
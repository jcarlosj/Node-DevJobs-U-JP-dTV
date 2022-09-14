const
    express = require( 'express' ),
    router = express.Router();

module.exports = () => {
    router.get( '/', ( req, res ) => {
        res.send( '<h2>DevJobs</h2>' );
    });

    return router;
}
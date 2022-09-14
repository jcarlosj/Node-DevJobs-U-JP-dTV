const
    express = require( 'express' ),
    app = express();

app.use( '/', ( req, res ) => {
    res.send( '<h2>DevJobs</h2>' );
});

app.listen( 4000 );
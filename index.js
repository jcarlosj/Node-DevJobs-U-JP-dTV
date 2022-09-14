const
    express = require( 'express' ),
    app = express(),
    router = require( './src/routes' );

/** Rutas */
app.use( '/', router() );

app.listen( 4000 );
const mongoose = require( 'mongoose' );
require( './src/config/db.config' );    // Importar la conexion de la base de datos

const
    path = require( 'path' ),
    express = require( 'express' ),
    app = express(),
    exphbs = require( 'express-handlebars' ),
    router = require( './src/routes' );

require( 'dotenv' ).config({
    path: '.env'
}); 

/** Habita motor de plantillas Handlebars para las Vistas */
app.engine( 'handlebars', exphbs.engine({
    defaultLayout:'layout'                  // Nombre archivo por defecto para el layout, lo buscará en el defecto layouts dentro del views.
}));
app.set( 'view engine', 'handlebars' );
app.set( 'views', './src/views' );          // Ruta por defecto de las Vistas

/** Habilita acceso a archivos estáticos */
app.use( express.static( path.join( __dirname, 'public' ) ) );

/** Rutas */
app.use( '/', router() );

app.listen( process.env.PORT || 4000 );
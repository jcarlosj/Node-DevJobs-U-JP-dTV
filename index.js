const mongoose = require( 'mongoose' );
require( './src/config/db.config' );    // Importar la conexion de la base de datos

const
    PORT = process.env.PORT || 4000,
    path = require( 'path' ),
    express = require( 'express' ),
    app = express(),
    session = require( 'express-session' ),
    cookieParser = require( 'cookie-parser' ),
    exphbs = require( 'express-handlebars' ),
    router = require( './src/routes' ),
    MongoDBStore = require( 'connect-mongodb-session' )( session );     // ! agregue este paquete para almacenar la identificación de la sesión del usuario automáticamente en mongodb
                                                                        // ! verifique su base de datos, tendrá otra colección (junto a personas) que es 'sessions'
require( 'dotenv' ).config({
    path: '.env'
}); 

/** Define la configuracion de la sesión usando la conexión con mongodb 
 *  Este módulo exporta una sola función que toma una instancia de connect (o Express) y devuelve una clase MongoDBStore que se puede usar para almacenar sesiones en MongoDB.
*/
var store = new MongoDBStore({
        uri: process.env.DATABASE_URL,              // ! MongoDB URL conexion a la base de datos
        databaseName: process.env.DATABASE_NAME,    // ! Base de datos MongoDB para almacenar sesiones
        collection: 'sessions'                      // ! Colección MongoDB para almacenar sesiones
    },
    function( error ) {
        if( error ) {
            console.error( error );
            return false;
        }

        console.log( 'Database is connected!' );
        
    });

store.on( 'error', function( error ) {
    console.error( error );
});

/** Habilita uso de JSON */
app.use( express.json() );                              /** Habilita el uso de JSON en espera que los datos de la solicitud se envíen en formato JSON, que a menudo se asemeja a un objeto JS simple */
app.use( express.urlencoded({ extended: true }) );      /** Habilita el uso de JSON dentro del body del request en espera que los datos de la solicitud se envíen codificados en la URL, generalmente en cadenas o matrices */

/** Habita motor de plantillas Handlebars para las Vistas */
app.engine( 'handlebars', exphbs.engine({
    defaultLayout:'layout',                 // Nombre archivo por defecto para el layout, lo buscará en el defecto layouts dentro del views.
    helpers: require( './src/helpers/handlebars' )    // Helpers para handlebars
}));
app.set( 'view engine', 'handlebars' );
app.set( 'views', './src/views' );          // Ruta por defecto de las Vistas

/** Habilita acceso a archivos estáticos */
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( cookieParser() );      // ! Habilita CookieParser
app.use( session({              // ! Habilita un sistema de sesiones a partir de la conexion con Mongoose, para evitar tener que loguearse todo el tiempo
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,              // ! No crea sesión hasta que algo almacenado
    saveUninitialized: false,   // ! No guarda sesión si no se modifica
    store                       // ! Agrega el store a la sesión
}));

/** Rutas */
app.use( '/', router() );

app.listen( PORT, () => {
    console.log( `Server listening on port ${ PORT }` );
} );
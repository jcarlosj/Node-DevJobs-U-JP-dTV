const mongoose = require( 'mongoose' );

require( 'dotenv' ).config({
    path: '.env'
});

mongoose.connect( process.env.DATABASE_URL, {
    useNewUrlParser: true
});

mongoose.connection.on( 'error', err => console.error( err ) );


/** Import Models */
require( '../models/Vancancies' );
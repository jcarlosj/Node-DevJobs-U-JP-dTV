const
    slug = require( 'slug' ),
    shortid = require( 'shortid' ),
    mongoose = require( 'mongoose' );

mongoose.Promise = global.Promise;


const vacanciesSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'El nombre de la vacante es obligatorio'
    },
    enterprise: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
        required: 'La ubicación es obligatoria'
    },
    salary: {
        type: String,
        trim: true,
        default: 0,
    },
    contract: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    url: {
        type: String,
        trim: true,
        lowercase: true,
    },
    skills: [ String ],
    candidates: [{
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        pathCurriculumVitae: {
            type: String,
            trim: true,
            lowercase: true,
        }
    }]
});

// ! Antes de guardar
vacanciesSchema.pre( 'save', function( next ) {
    const url = slug( this.title );
    this.url = `${ url }-${ shortid.generate() }`;

    next();
});


module.exports = mongoose.model( 'Vacant', vacanciesSchema );
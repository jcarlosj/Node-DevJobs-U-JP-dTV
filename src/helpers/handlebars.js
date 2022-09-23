module.exports = {
    selectedSkills: ( selected = [], options ) => {

        console.log( 'Skills seleccionados: ', selected );
        console.log( 'Opciones de skills: ', options.fn() );

        const skills = [ 
            'PHP', 'WordPress', 'Drupal', 'Joomla', 'Symfony', 'Laravel',
            'JavaScript', 'TypeScript', 'Vue', 'Angular', 'React', 'Svelte',
            'CSS', 'Sass', 'Less', 'PostCSS', 'Tailwind', 'Material', 'Bootstrap',
            'Python', 'Django', 'Flask', 'GraphQL', 'Apollo', 'Sequelize', 'Mongoose', 
            'MongoDB', 'Redis', 'MySQL', 'PostgresSQL', 'Oracle', 'MariaDB'
        ];

        let html = ``;

        skills.forEach( skill => {
            html += `<li ${ selected.includes( skill ) ? 'class="activo"' : '' } >${ skill }</li>`;
        });

        return options.fn().html = html;
    },
    contractType: ( selected = [], options ) => {
        
        console.log( 'Tipo contrato: ', selected );
        console.log( 'Opciones de contrato: ', options.fn() );

        console.log( 'Regex', new RegExp( `value="${ selected }"` ) );

        /** Retorna todas las opciones con la opcion registrada seleccionada en elemento select */
        return options.fn( this ).replace( 
            new RegExp( `value="${ selected }"` ),  // ! Expresion regular busca un un patrón coincidente
            `$& selected="selected"`                // ! $& (alias de RegExp.lastMatch) que lee el valor del match y permite modificarlo cuando existe una coincidencia exitosa (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch) 
        );

    },
    showAlerts: ( arrMessages = {}, alerts ) => {

        let html = '';
        const category = Object.keys( arrMessages );  // Obtiene nombre de las propiedades del arrErrors

        console.log( 'arrErrors: ', arrMessages );
        console.log( 'alerts: ', alerts.fn() );
        console.log( 'category: ', category );

        /** Valida que existan categorias para desplegar mensajes  */
        if( category.length ) {
            /** Itera los mensajes del array de mensajes bajo la categoria especifica para crear un componente para desplegar cada mensaje */
            arrMessages[ category ].forEach( msg => {
                html += `<div class="${ category } alerta">${ msg }</div>`;
            });
        }

        console.log( html );

        return alerts.fn().html = html;
    }
}
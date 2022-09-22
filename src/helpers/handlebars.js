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

    }
}
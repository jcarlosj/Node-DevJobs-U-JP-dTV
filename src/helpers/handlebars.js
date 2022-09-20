module.exports = {
    selectedSkills: ( selected = [], options ) => {
        const skills = [ 
            'PHP', 'WordPress', 'Drupal', 'Joomla', 'Symfony', 'Laravel',
            'JavaScript', 'TypeScript', 'Vue', 'Angular', 'React', 'Svelte',
            'CSS', 'Sass', 'Less', 'PostCSS', 'Tailwind', 'Material', 'Bootstrap',
            'Python', 'Django', 'Flask', 'GraphQL', 'Apollo', 'Sequelize', 'Mongoose', 
            'MongoDB', 'Redis', 'MySQL', 'PostgresSQL', 'Oracle', 'MariaDB'
        ];

        let html = ``;

        skills.forEach( skill => {
            html += `<li>${ skill }</li>`;
        });

        return options.fn().html = html;
    }
}
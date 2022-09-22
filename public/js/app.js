document.addEventListener( 'DOMContentLoaded', () => {
    const skills = document.querySelector( '.lista-conocimientos' );

    if( skills ) {
        skills.addEventListener( 'click', addSkill );

        selectedSkills();
    }
});


const skills = new Set();

const addSkill = event => {
    // console.log( event.target );

    /** Validamos el evento solo sobre los elementos LI */
    if( event.target.tagName === 'LI' ) {

        /** Elimina skill */
        if( event.target.classList.contains( 'activo' ) ) {
            event.target.classList.remove( 'activo' );
            skills.delete( event.target.textContent );
        }
        else {  /** Si no agrega skill */
            event.target.classList.add( 'activo' );
            skills.add( event.target.textContent );
        }

    }

    console.log( skills );
    document.querySelector( '#skills' ).value = [ ...skills ];  // Inyecta los tados en el input type="hidden"

}

const selectedSkills = () => {
    /** Obtiene todos los elementos activos y el resultado lo convierte en un Array */
    const selected = Array.from( 
        document.querySelectorAll( '.lista-conocimientos .activo' ) 
    );

    /** Obtener todos los valores dentro de los elementos contenidos en el Array */
    selected.forEach( el => {
        skills.add( el.textContent );
    });

    console.log( skills );
    document.querySelector( '#skills' ).value = [ ...skills ];  // Inyecta los tados en el input type="hidden"

}
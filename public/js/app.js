document.addEventListener( 'DOMContentLoaded', () => {
    const skills = document.querySelector( '.lista-conocimientos' );

    if( skills ) {
        skills.addEventListener( 'click', addSkill );
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
    document.querySelector( '#skills' ).value = [ ...skills ];
}
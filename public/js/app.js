document.addEventListener( 'DOMContentLoaded', () => {
    const
        skills = document.querySelector( '.lista-conocimientos' ),
        alertsEl = document.querySelector( '.alertas' );

    if( alertsEl )
        clearAlerts( alertsEl );

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

const clearAlerts = ( alerts ) => {

    const intervalID = setInterval( () => {
        /** Validamos si el elemento tiene elementos hijos */
        if( alerts.children.length > 0 ) {
            alerts.removeChild( alerts.children[ 0 ] );  // ! Elimina el primer hijo del elemento alerts
            console.log( 'Elimina alerta' );
        }
        else {
            clearInterval( intervalID );
            intervalID = null;
            console.log( 'Elimina setInterval & y elemento con clase alerta del DOM' );

            alerts.parentElement.removeChild( alerts );
        }

    }, 2000 );  // ! Se ejecutara cada 2 segundos

}
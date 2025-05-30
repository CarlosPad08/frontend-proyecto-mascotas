import React from 'react';
import BotonCerrarSesion from './BotonCerrarSesion';

// Componente de orden superior (HOC) que añade el botón de cerrar sesión
const withCerrarSesion = (WrappedComponent) => {
    return (props) => (
        <>
            <WrappedComponent {...props} />
            <BotonCerrarSesion />
        </>
    );
};

export default withCerrarSesion;

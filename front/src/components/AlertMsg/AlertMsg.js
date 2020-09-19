import React from 'react';
import { Alert } from 'react-bootstrap';


/*Función que muestra una alerta con un mensaje y un color.
  @param text : recibe el mensaje de error, ej: "Contraseña incorrecta"
  @param variant : recibe palabras clave para determinar color, ej: "danger"(rojo), "warning"(amarillo), "success"(verde)
*/
const AlertMsg = ({text, variant}) => {
    return ( 

        <Alert className="text-center" variant={variant}>
        {text}
        </Alert>

     );
}
 
export default AlertMsg;
//la funcion css se usa de apoyo para recuperar las ayudas del autocompletado puede funcionar sin esa funcion
import styled, { css } from "styled-components";

//la propiedad as permite colocar la etiqueta que queremos que se renderice en el html una vez generado el style component
const Heading = styled.h1`
${(props) => props.as === "h1" &&
        css`font-weight:600; 
        font-size:3rem;`
    }

${(props) => props.as === "h2" &&
        css`font-weight:600; 
        font-size:2rem;`
    }
${(props) => props.as === "h3" &&
        css`font-weight:500; 
        font-size:2rem;`
    }
${(props) => props.as === "h4" &&
        css`font-weight:600; 
        font-size:3rem;
        text-align:center;
        `
    }

`

export default Heading;
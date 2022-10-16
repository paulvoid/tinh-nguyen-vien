import styled, { createGlobalStyle } from 'styled-components';

// vietnamese bulma
const GlobalStyle = createGlobalStyle`
    body {
      
        font-family: 'Roboto',monospace;
        font-size: 16px;
        color: #333;
        background-color: #fff;
        margin: 0;
        padding: 0;
    }
    a {
        color: #333;
        text-decoration: none;
      
    }
    img {
        max-width: 100%;
        height: auto;
      
    }
`;

export default GlobalStyle;
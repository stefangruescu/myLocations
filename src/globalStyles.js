// globalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    font-family: 'Open Sans', sans-serif;
}
  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

export default GlobalStyle;

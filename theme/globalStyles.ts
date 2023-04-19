import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

const GlobalStyle = createGlobalStyle`
${normalize}

:root {
    --color-white: hsl(0, 0%, 100%);
    --color-very-light-grey: hsl(0, 0%, 97%);
    --color-light-grey: hsl(0, 0%, 90%);
    --color-grey: hsl(0, 0%, 85%);
    --color-dark-grey: hsl(0, 0%, 60%);
    --color-orange: hsl(40, 85%, 80%);
    --color-black: hsl(0, 3%, 2%);
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
    display: flex;
		flex-direction: column;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 20px;
    color: var(--color-dark-grey);
    width: 100vw;
    margin: auto; 
    height: 100vh;
    background-color: var(--color-white);
    overflow-y: auto;
    position: relative;


}

.react-multi-carousel-list {
  width: 100%;
}

.react-multiple-carousel__arrow {
  width: 43px;
  height: 43px;

  @media (max-width: 650px) {
    display: none;
  }

}

.react-multi-carousel-item {
  display: flex;
  justify-content: center;
  width: 100%
} 

a {
  text-decoration: none;
  color: var(--color-black);
}

.red {
  color: red;
}

`;

export default GlobalStyle;

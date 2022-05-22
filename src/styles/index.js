import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import normalize from 'styled-normalize'

import './variables.scss'

const GlobalStyles = createGlobalStyle`

  ${reset}
  ${normalize}

  * {
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;

    &:focus {
      outline: none;
    }
    &:before, &:after {
      box-sizing: border-box;
    }
  }

  

  ::placeholder {
    color: var(--c__grey-400);
  }

  ${
		'' /*
  ::-webkit-scrollbar {
    width: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0,0,0,0.1);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color:  rgba(0,0,0,0.2);
    border-radius: 5px;
    
    &:hover {
      background-color:  rgba(0,0,0,0.3);
    }
    &:active {
      background-color:  rgba(0,0,0,0.4);
    }
  }
  
  */
	}

  body {
    background-color: var(--c__grey-100);
    font-family:  var(--font__family);
    width: 100%;
    height: 100vh;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  p,
  span,
  li,
  a,
  button,
  label,
  table,
  textarea,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--font__family);
    line-height: 1.4;
  }

  a {
    display: block;
    color: var(--c__grey-500);
    text-decoration: none;
  }

  em {
    font-style: italic;
  }

  button {
    appearance: none;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    -webkit-app-region: no-drag;
  }

  img {
    max-width: 100%;
    width: 100%;
    height: auto;
  }
`

export default GlobalStyles

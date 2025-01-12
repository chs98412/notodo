import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

  :root {
    text-align: center;
    max-width: 500px;
    font-family: 'Pretendard';
    margin: 0 auto;
    -ms-overflow-style: none; 
    scrollbar-width: none;
    &::-webkit-scrollbar{
      display: none;
    }
  }

  button {
    border: none;
    padding: 0;
    cursor: pointer;
    background-color: transparent;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  input, textarea {
    outline: none;
  }
`;
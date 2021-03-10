import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body{
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme: { typography } }) =>
      `${typography.font}, ${typography.family}`};
  }
  h1, h2, h3, h4, h5{
    color: ${({ theme }) => theme.colors.primary};
  }
  a{
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    &:hover{
      color:  ${({ theme }) => theme.colors.acessory};
  }

  }
`;

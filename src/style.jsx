import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    color-scheme: ${({ theme }) => theme.colorScheme};
  }
  body {
    align-items: center;
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.fontColor};
    display: flex;
    font-family: Tahoma, Helvetica;
    justify-content: center;
    margin: 0;
    min-height: 100vh;
    text-align: center;
    transition: background-color 0.2s ease;
  }
`
export const darkTheme = {
  accentColor: '#c84b4b',
  bgColor: '#232323',
  bgColor2: '#282828',
  bgColor3: '#3f3f3f',
  borderColor: '#727272',
  colorScheme: 'dark',
  fontColor: '#d0d0d0',
  shadowColor: '#1c1c1c'
}
export const lightTheme = {
  accentColor: '#4b6cc8',
  bgColor: '#f7f7f7',
  bgColor2: '#e4e6eb',
  bgColor3: '#dadfee',
  borderColor: '#afafaf',
  colorScheme: 'light',
  fontColor: '#4e4e4e',
  shadowColor: '#d3d3d3'
}

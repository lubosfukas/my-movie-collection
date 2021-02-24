import { createGlobalStyle } from 'styled-components'
import { Theme } from './theme'

const globalStyle = createGlobalStyle<{ theme: Theme }>`
    body {
        margin: 0; 
        padding: 0; 
        background-color: ${({ theme }) => theme.color.white};
        font-family: ${({ theme }) => theme.font.family};
        
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        height: 100%;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
    }
`

export default globalStyle

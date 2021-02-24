import baseStyled, { ThemedStyledInterface } from 'styled-components'

export const theme = {
    color: {
        dark: '#222831',
        red: '#f05454',
        gray: '#dddddd',
        white: '#ffffff',
        black: '#000000'
    },
    font: {
        family: 'Verdana, sans-serif'
    },
    container: {
        width: '1000px'
    }
}

export type Theme = typeof theme

const styled = baseStyled as ThemedStyledInterface<Theme>

export default styled

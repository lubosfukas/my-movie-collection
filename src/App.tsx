import React from 'react'
import { ThemeProvider } from 'styled-components'

import { Layout } from './components'
import { Pages } from './pages'
import { GlobalStyle } from './styled'
import { theme } from './styled/theme'

function App(): React.ReactElement {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Layout>
                <Pages />
            </Layout>
        </ThemeProvider>
    )
}

export default App

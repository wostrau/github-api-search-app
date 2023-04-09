import React from 'react'
import {Github} from './components/Github'
import PrimarySearchAppBar from './components/PrimarySearchAppBar'
import {Container, Grid} from '@mui/material'


function App() {
    return (
        <div className="App">
            <PrimarySearchAppBar/>
            <Container fixed>
                <Grid
                    container
                    spacing={1}
                >
                    <Github/>
                </Grid>
            </Container>
        </div>
    )
}

export default App

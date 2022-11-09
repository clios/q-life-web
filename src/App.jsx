// Local dependencies
import Routes from './Routes'
// import particlesConfig from './particlesjs-config.json'

// External dependencies
import React from 'react'
import SnackbarProvider from 'react-simple-snackbar'
// import Particles from 'react-tsparticles'
import { Container } from 'shirakami-ui'

function App() {
  window.onpopstate = function () {
    location.reload()
  }

  return (
    <SnackbarProvider>
      {/* <Particles className="particles" options={particlesConfig} /> */}
      <Container>
        <Routes />
      </Container>
    </SnackbarProvider>
  )
}

export default App

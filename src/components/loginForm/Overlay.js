import React from 'react'
import StyledOverlay, { InnerLogin, InnerSignup } from './styled/StyledOverlay'
// import { STATE_LOG_IN } from './useToggle'

const WelcomeOverlay = ({ toggleMode, mode }) => (
  <InnerLogin className="inner">
    <h1>Welcome Back!</h1>
    <p>To keep connected with us please login with your personal info</p>
    <button onClick={toggleMode}>
      <span>Sign up</span>
    </button>
  </InnerLogin>
)

const NewOverlay = ({ toggleMode, mode }) => (
  <InnerSignup className="inner">
    <h1>Hello, Friend!</h1>
    <p>Enter your details below <span><br></br></span>to start your journey with us</p>
    <button id='b1' onClick={toggleMode}>
      <span>Sign in</span>
    </button>
  </InnerSignup>
)

const Overlay = ({ toggleMode, mode }) => (
  <StyledOverlay className="overlay">
    <WelcomeOverlay toggleMode={toggleMode} mode={mode}/>
    <NewOverlay toggleMode={toggleMode} mode={mode}/>
    {/* <button onClick={toggleMode}>
      <span>{mode === STATE_LOG_IN ? 'Sign in' : 'Sign up'}</span>
    </button> */}
  </StyledOverlay>
)

export default Overlay

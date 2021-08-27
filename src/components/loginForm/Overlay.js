import React from 'react'
import StyledOverlay, { InnerLogin, InnerSignup } from './styled/StyledOverlay'
// import { STATE_LOG_IN } from './useToggle'

const WelcomeOverlay = ({ toggleMode, mode }) => (
  <InnerLogin className="inner">
    <h1 id='he3'>Welcome Back!</h1>
    <p id='p3'>To keep connected <span><br></br></span> with us please login with <span><br></br></span>your personal info</p>
    <h3 id='he3'>OR</h3>
    <button id='b1' onClick={toggleMode}>
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

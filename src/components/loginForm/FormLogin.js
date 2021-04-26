import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SocialButton from './styled/SocialButton'
import BrandButton from './styled/BrandButton'
import SlidingForm from './styled/SlidingForm'

const FormLogin = () => (
  <SlidingForm>
    <h1>Sign in</h1>
    
    <p>or use your account</p>
    <form>
      <input placeholder="Email" type="text" />
      <input placeholder="Password" type="password" />
    </form>
    <p>
      <a href="#">Forgot your password?</a>
    </p>
    <BrandButton>Sign in</BrandButton>
  </SlidingForm>
)

export default FormLogin

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SocialButton from './styled/SocialButton'
import BrandButton from './styled/BrandButton'
import SlidingForm from './styled/SlidingForm'

const FormLogin = () => (
  <SlidingForm className="text-center">
    <h1 className="text-center">Sign in</h1>
    
    <p className="text-center">or use your account</p>
    <form>
      <input placeholder="Email" type="text" />
      <input placeholder="Password" type="password" />
    </form>
    <p>
      <a href="#" className="ml-5 pl-2">Forgot your password?</a>
    </p>
    <BrandButton>Sign in</BrandButton>
  </SlidingForm>
)

export default FormLogin

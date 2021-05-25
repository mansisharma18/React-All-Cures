import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SocialButton from './styled/SocialButton'
import BrandButton from './styled/BrandButton'
import SlidingForm from './styled/SlidingForm'

const FormLogin = () => (
  <SlidingForm>
    <h1>Sign in</h1>
<<<<<<< HEAD
    <div>
      <SocialButton>
        <FontAwesomeIcon icon={['fab', 'facebook-f']} />
      </SocialButton>
      <SocialButton>
        <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
      </SocialButton>
      <SocialButton>
        <FontAwesomeIcon icon={['fab', 'google']} />
      </SocialButton>
    </div>
=======
    
>>>>>>> 97df73c12cdc474e72b299462d999a5b407ff9a4
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

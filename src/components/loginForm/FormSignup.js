import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SocialButton from './styled/SocialButton'
import BrandButton from './styled/BrandButton'
import SlidingForm from './styled/SlidingForm'

const FormSignup = () => (
  <SlidingForm signup className="text-center">
    <h1 className="text-center">Create Account</h1>
     <p className="text-center">or register with your email</p>
    <form>
      <input placeholder="First Name" type="text" />
      <input placeholder="Last Name" type="text" />
      <input placeholder="Email" type="email" />
      <input placeholder="Password" type="password" />
      <input placeholder="Repeat Password" type="password" />
      <div>
        User Type: 
        <select name="user-type" id="userType" placeholder="User Type">
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
      </div>
      {/* <div>
        Accept Terms and Conditions
        <input placeholder="Accept Terms and Conditions" type="checkbox"/>
      </div>
      <div>
        Accept Policy
        <input placeholder="Accept Policy" type="checkbox"/>
      </div> */}
    </form>
    <BrandButton>Sign up</BrandButton>
  </SlidingForm>
)

export default FormSignup

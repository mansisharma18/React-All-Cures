import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import SocialButton from './styled/SocialButton'
import BrandButton from './styled/BrandButton'
import SlidingForm from './styled/SlidingForm'

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const loginForm = async e => {
    e.preventDefault();
    const res = await fetch("/login?cmd=login", {
      method: "POST",
      body: `email=${email}&psw=${password}&rempwd=on`,
      headers: {
      "Content-Type": "application/x-www-form-urlencoded"
      }
  });
        // .then(data => setPostId(data.id));
  }
  return(
  <SlidingForm className="text-center">
    <h1 className="text-center">Sign in</h1>
    
    <p className="text-center">or use your account</p>
    <form onSubmit={loginForm}>
      <input placeholder="Email" name="email" type="email" autoComplete="off" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" name="password" type="password" onChange={e => setPass(e.target.value)} />
      <BrandButton type="submit">Sign in</BrandButton>

    </form>
    <p>
      <a href="#" className="ml-5 pl-2">Forgot your password?</a>
    </p>
  </SlidingForm>
)}

export default FormLogin

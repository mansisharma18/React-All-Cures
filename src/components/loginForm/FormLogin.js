import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BrowserRouter,Router, Switch, Route, Redirect } from "react-router-dom";

import SocialButton from './styled/SocialButton'
import BrandButton from './styled/BrandButton'
import SlidingForm from './styled/SlidingForm'

const FormLogin = (props) => {
  
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setError] = useState("");
  const [status, setStatus] = useState("");
  const [buttonClick, setClicked] = useState("");

  const loginForm = async (e, props) => {
    e.preventDefault();
    
    setClicked(1);
    const res = await fetch("/login?cmd=login", {
      method: "POST",
      body: `email=${email}&psw=${password}&rempwd=on`,
      headers: {
      "Content-Type": "application/x-www-form-urlencoded"
      }
  });
  console.log('props '+props)
  console.log('status '+ res.status)

  // res.status === 404 
  //   ? console.log('Showw Error')
  //   : console.log('Redirect to page');

  res.status === 200
    ? <Success/>
    : <Success/>;

    setStatus(res.status);
  const data = await res.text();
  console.log('dataaaaa ', res)
    !data.hasOwnProperty("error")
      ? setMessage( 'success' )
      : setMessage( 'error' );

  setTimeout( () => console.log('Message ', message ), 1600 );
  setTimeout( () => console.log('Error ', isError ), 1600 );

  function Success(){
    return(
      <div className="alert alert-primary" role="alert">Success</div>
    )
  }
}

  return(
  <SlidingForm className="text-center">
    <h1 className="text-center">Sign in</h1>
    
    <p className="text-center">or use your account</p>
    
    { buttonClick === 1
        ? status === 200
          ? <div className="alert alert-primary" role="alert">Successfully Logged In!</div>
          : <div className="alert alert-secondary" role="alert">Error Logging In!</div>
        : console.log('button not clicked')
    }

    
    <form onSubmit={loginForm}>

      <input 
        placeholder="Email" 
        name="email" 
        type="email" 
        autoComplete="off" 
        onChange={
          e => setEmail(e.target.value)
        } 
      />
      <input 
        placeholder="Password" 
        name="password" 
        type="password" 
        onChange={
          e => setPass(e.target.value)
        } 
      />
      <BrandButton className="ml-5 " type="submit">Sign in</BrandButton>

    </form>
    <p>
      <a href="#" className="ml-5 pl-2">Forgot your password?</a>
    </p>
    {/* <Success/> */}
  </SlidingForm>
)}

export default FormLogin;

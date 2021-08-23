import React, {useState} from 'react'
import {Redirect } from "react-router-dom";
import BrandButton from './styled/BrandButton'
import SlidingForm from './styled/SlidingForm'
import { Checkbox, FormGroup, FormControlLabel} from '@material-ui/core'

const FormLogin = (props) => {
  
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const [status, setStatus] = useState("");
  const [buttonClick, setClicked] = useState("");

  const loginForm = async (e, props) => {
    e.preventDefault();
    
    setClicked(1);
    const res = await fetch("/login?cmd=login", {
      method: "POST",
      body: `email=${email}&psw=${password}&rempwd="on"`,
      headers: {
      "Content-Type": "application/x-www-form-urlencoded"
      }
  });
  console.log('props '+props)
  console.log('status '+ res.status)
  console.log('Statusssssssssssssssss ',status)
  // res.status === 404 
  //   ? console.log('Showw Error')
  //   : console.log('Redirect to page');

  // res.status === 200
  //   ? <Success/>
  //   : <Success/>;

    setStatus(res.status);
    console.log('Statsus res ',res.status)
  const data = await res.text();
  console.log('dataaaaa ', res)
    !data.hasOwnProperty("error")
      ? setMessage( 'success' )
      : setError( true );

  setTimeout( () => console.log('Message ', message ), 1600 );
  setTimeout( () => console.log('Error ', isError ), 1600 );
}
// function Eror(){
//   // setReload(true)
//   setTimeout(() => {
//     return(
//       <div className="alert alert-secondary" role="alert">Email or Password incorrect</div>
//     )
//   }, 1000);
// }
// Redirect and Reload after logging in

function Redirec(){
  setTimeout(() => {
    window.location.reload();
  }, 1000);
  return(
    <Redirect to={{
      pathname: '#'
    }}/>
  )
}

  return(
  <SlidingForm className="text-center">
    <h1 id='he4' className="text-center">Sign in</h1>
    
    <p className="text-center">or use your account</p>
    
    { 
      buttonClick === 1? 
        status === 200 ? 
          Redirec()
          : <div className="alert alert-secondary" role="alert">Email or Password incorrect</div>
        : console.log('Button not clicked')
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
      <FormGroup>
        <FormControlLabel
          control={<Checkbox name="Terms" value="on" required/>}
          label="Remember Me"
        />
      </FormGroup>
      <BrandButton className="ml-5 " type="submit">Sign in</BrandButton>

    </form>
    <p >
      <a href="/#" className="ml-5 pl-2">Forgot your password?</a>
    </p>
    {/* <Success/> */}
  </SlidingForm>
)}

export default FormLogin;

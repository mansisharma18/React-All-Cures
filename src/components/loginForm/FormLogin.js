import React, {useState} from 'react'
import { Redirect } from "react-router-dom";
import BrandButton from './styled/BrandButton'
import SlidingForm from './styled/SlidingForm'
import { Checkbox, FormGroup, FormControlLabel} from '@material-ui/core'
import GoogleLogin from 'react-google-login'
import axios from 'axios';
import { backendHost } from '../../api-config';


const FormLogin = (props) => {
  
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const [status, setStatus] = useState("");
  const [buttonClick, setClicked] = useState("");
  const [data, setData] = useState([])

  const loginForm = async (e, props) => {
    e.preventDefault();
    
    setClicked(1);
    axios.post(`${backendHost}/login?cmd=login&email=${email}&psw=${password}&rempwd=on`)
    .then(response => console.log(response.data))
    .catch(res => console.log(res))
    // const res = await fetch("/login?cmd=login", {
    //   method: "POST",
    //   body: `email=${email}&psw=${password}&rempwd="on"`,
    //   headers: {
    //   "Content-Type": "application/x-www-form-urlencoded"
    //   }
  // });

  // setData(res.data)
  // console.log('Dataaaaaaaaa: ', res)
  // console.log('props '+props)
  // console.log('status '+ res.status)
  // console.log('Statusssssssssssssssss ',status)
  //   setStatus(res.status);
  //   console.log('Statsus res ',res.status)
  // const data = await res.text();
  // console.log('dataaaaa ', res)
  //   !data.hasOwnProperty("error")
  //     ? setMessage( 'success' )
  //     : setError( true );

  // setTimeout( () => console.log('Message ', message ), 1600 );
  // setTimeout( () => console.log('Error ', isError ), 1600 );
}

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

function AfterLogin() {
  if(status === 200){
    console.log('logged in')
  } else if(status === 401){
    return(
      <div className="alert alert-secondary" role="alert">{data}</div>
    )
  // } else if(status === 401){
  //   return(
  //     <div className="alert alert-secondary">Incorrect email or password!</div> 
  //   )
  } else {
    return(
      <div className="alert alert-secondary" role="alert">Some Error Occured!</div>
    )
  }
} 
  const responseGoogle = (res) => {
    console.log(res);
    console.log(res.profileObj);
  }
  return(
  <SlidingForm className="text-center">
    <h1 id='he4' className="text-center">Sign in</h1>
    
    <p  className="text-center">or use your account</p>
    <GoogleLogin
        clientId="529398297055-37e0rfns77ig0nih2moffq1pdp533329.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        className="text-dark"
      />
    {/* { 
      buttonClick === 1? 
        status === 200 ? 
          Redirec()
          : <div className="alert alert-secondary" role="alert">Email or Password incorrect</div>
        : console.log('Button not clicked')
    } */}
    {
      buttonClick === 1?
        AfterLogin()
        : null
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
          control={<Checkbox name="Terms" value="on"/>}
          label="Remember Me"
        />
      </FormGroup>
      <BrandButton className="ml-5 " type="submit">Sign in</BrandButton>

    </form>
    <p id='p4'>
      <a href="/loginForm/verify" className="ml-5 pl-2">Forgot your password?</a>
    </p>
    {/* <Success/> */}
  </SlidingForm>
)}

export default FormLogin;

import React, {useState} from 'react';
// import './Login.js'
import { Modal } from 'react-bootstrap';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie'
import {Select, MenuItem , InputLabel, FormControl, Checkbox, FormGroup, FormControlLabel} from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import { usePasswordValidation } from '../hooks/usePasswordValidation';
import { backendHost } from '../../api-config';

import './test.css'

const Test = (props) => {
  
  // Sign in form's states

    const [click, setClick] = useState(true)
    const [email, setEmail] = useState("");
    const [signInpassword, setPass] = useState("");
    const [status, setStatus] = useState("");
    const [buttonClick, setClicked] = useState("");
    const [data, setData] = useState([])

    // Sign up form's states

    const [firstName, setFname] = useState("");
    const [lastName, setLname]= useState("");
    const [password, setPassword] = useState({
      firstPassword: "",
      secondPassword: "",
    });
    const [terms, setTerms] = useState("");
    const [policy, setPolicy] = useState("");
    const [rempwd, setRempwd] = useState("");
    const [userType, setUserType] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setError] = useState(false);
    const [buttonSignUpClick, setSignUpClicked] = useState("");
    // const [region, setRname]= useState("");
    // const [gender, setGender]= useState("");
    const [number, setMname]= useState("");
    // const [form, setForm]= useState("");
     const [emailExists, setExists] = useState(false)
    const [promo, setPromo] =useState(null)
    const [validEmail, setValidEmail] = useState()
     const [success, setSuccess] = useState(false)
  
    const [
      validLength,
      hasNumber,
      upperCase,
      lowerCase,
      match,
      specialChar,
    ] = usePasswordValidation({
          firstPassword: password.firstPassword,
          secondPassword: password.secondPassword,
        });
  
  const setFirst = (event) => {
    setPassword({ ...password, firstPassword: event.target.value });
  };
  const setSecond = (event) => {
    setPassword({ ...password, secondPassword: event.target.value });
  };

  const SignUpForm = async (e, props) => {
    e.preventDefault();
    setSignUpClicked(1);
    var res;
    if(validEmail && upperCase && lowerCase && match){
      axios.post(`${backendHost}/RegistrationActionController?firstname=${firstName}&lastname=${lastName}&email=${email}&psw=${password.firstPassword}&psw-repeat=${password.secondPassword}&rempwd=on&doc_patient=${userType}&acceptTnc=${terms}&number=${number}`
    ) .then(response => {
      if(response.data == 'Email Address already Exists in the System'){
        // setExists(true);
        setTimeout(() => {
          setSignUpClicked(3)
        }, 5000);
        document.getElementById('signup-msg').innerText = 'Email already exists!'
        console.log('kjsdhkasjdhkj: ', response.data)
      }
      else if(response.data.registration_id){
        // setSuccess(true);
        Cookies.set('uName', response.data.first_name)
        setTimeout(() => {
          window.location.reload()
        }, 500);
      }
    })
      .catch(err => {
        setTimeout(() => {
          setSignUpClicked(3)
        }, 5000);
        document.getElementById('signup-msg').innerText = 'Some error occured!' 
        console.log(err.response.data)
      })

    } else {
      console.log('not posssiiibbbllleee')
    }
  }

  const handleEmail = (e) => {
    var re= /^[a-zA-Z-0-9.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if(!re.test(e.target.value)){
      setValidEmail(false)
      console.log('Enter valid email')
    } else {
      setEmail(e.target.value)
      setValidEmail(true)
      console.log('validEmail')
    }
  }

  const afterSignUp = () => {
    console.log(emailExists, 'Email already exists')
    console.log(success, 'Successfully signed up')
    if(emailExists === true){
      return(<div className="alert alert-secondary">Email already exists!</div>);
    }
    else if(success === true){
      if(promo){
        return(
          <Redirect to={{
            pathname: '/article',
            state: { promoCode: '1' }
          }}
          />
        )
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return(
          <Redirect to={{
            pathname: '#'
          }}/>
        ) 
      }
    }
    else if(isError === true){
      return(
        <div className="alert alert-secondary">Some error occured!</div>
      );
    }
  }

  const handleClick =() => {
        if(click === true){
            document.getElementById('container').classList.add("right-panel-active")
        } else {
            document.getElementById('container').classList.remove("right-panel-active")
        }
    }

  const loginForm = async (e, props) => {
    e.preventDefault();
    setClicked(1);
    axios.post(`${backendHost}/login?cmd=login&email=${email}&psw=${signInpassword}&rempwd=on`)
    .then(response => {
      if(response.data.registration_id){
        Cookies.set('uName', response.data.first_name)
        console.log(response.data)
        setTimeout(() => {
          window.location.reload()
        }, 500);
      } else {
        document.getElementById('login-msg').innerText="Some error occured!"
      }
      console.log(response.data)
    })
    .catch(err => {
      if(err.response.data.includes('Incorrect email')){
        document.getElementById('login-msg').innerText="Incorrect email or password"
      } else {
        document.getElementById('login-msg').innerText="Some error occured!"
      }
      console.log(err.response.data)
    })
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

    const responseGoogle = (res) => {
      console.log(res);
      console.log(res.profileObj);
    }

    return(
        <div className="sign">
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Body >
        <div className="container sign" id="container">
    <div className="form-container sign-up-container">
      <form className="sign" onSubmit={SignUpForm}>
        <div className="h2 py-0 my-1">Create Account</div>
        <span>or use your email for registration</span>
        {/* <GoogleLogin
        clientId="529398297055-37e0rfns77ig0nih2moffq1pdp533329.apps.googleusercontent.com"
        buttonText="Register"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        className="text-dark"
      /> */}
      { 
        buttonSignUpClick == 1? 
          <div id="signup-msg" className="alert alert-danger mt-2 py-1 px-3 border border-dark"></div>
          : null
      }
        <input className="px-2 py-1 rounded border-dark border" 
          type="text" 
          placeholder="First Name" 
          onChange={
            e => setFname(e.target.value)
          }
          required
        />
        <input className="px-2 py-1 rounded border-dark border" 
          type="text" 
          placeholder="Last Name" 
          onChange={
            e => setLname(e.target.value)
          }
          required
        />
        <input className="px-2 py-1 rounded border-dark border" 
          type="email" 
          placeholder="Email"
          onChange={
            e => handleEmail(e)
          }
          required 
          />
        <input className="px-2 py-1 rounded border-dark border" 
          type="number" 
          placeholder="Mobile Number"
          onChange={
            e => setMname(e.target.value)
          }
          required
        />
        <input 
          className="px-2 py-1 rounded border-dark border" 
          type="password" 
          placeholder="Password" 
          onChange={
            e => setFirst(e)
          }
          required
        />
        {
          buttonSignUpClick === 1?
          <div className="rounded alert-danger">
            <div className="alert-msg">
            {
          !validEmail ?
          <div>◼ Enter Valid Email! </div>
            : null
        }
        {
          !validLength?
            <div>◼ Password should contain at least 8 characters! </div>          
            : null
        }
        {
          !upperCase?
            <div>◼ Password should contain at least 1 uppercase character! </div>          
            : null
        }
        {
          !lowerCase?
            <div>◼ Password should contain at least 1 lowercase character! </div>          
            : null
        }
        {
          !match?
          <div>◼ Passwords don't match! </div>
          : null
        }
        </div>
        </div>
        : null
        }
        <input 
          className="px-2 py-1 rounded border-dark border" 
          type="password" 
          placeholder="Confirm Password" 
          onChange={
            e => setSecond(e)
          }
          autoComplete="off"
          required
        />
        {/* <FormControl >
        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select 
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value=""
            onChange=""
            required
            className="select col-md-10"
          >
          <MenuItem value="doctor">Doctor</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
        </FormControl> */}

          {/* <FormGroup>
            <FormControlLabel
              control={<Checkbox name="Terms"  value="on" required/>}
              label="Accept Terms & Conditions"
              required
            />
            <FormControlLabel
              control={<Checkbox name="remember_me"value="on"/>}
              label="Remember Me"
              required
            />
          </FormGroup> */}
          <FormControl className="mb-4 w-75">
        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select 
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
          <MenuItem value="doctor">Doctor</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
        </FormControl>
        <button type="submit" className="ghost">Sign Up</button>
      </form>
    </div>
    <div className="form-container sign-in-container">
      <form className="sign" onSubmit={loginForm}>
        <h1>Sign in</h1>
        <span>or use your account</span>
        
        {/* <GoogleLogin
        clientId="529398297055-37e0rfns77ig0nih2moffq1pdp533329.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        className="text-dark"
      /> */}
        {/* {
          buttonClick === 1?
            AfterLogin()
            : null
        } */}
        {
          buttonClick === 1?
          <div id="login-msg" className="alert alert-danger mt-2 py-1 px-3 border border-dark"></div>
          : null
        }
        
        <input 
          className="p-2 rounded border-dark border" 
          type="email" 
          placeholder="Email" 
          autoComplete="off" 
          onChange={
            e => setEmail(e.target.value)
          } 
        />
        <input 
          className="p-2 rounded border-dark border" 
          type="password" 
          placeholder="Password" 
          onChange={
            e => setPass(e.target.value)
          }
        />
        <Link className="text-dark" to="/loginForm/verify">Forgot your password?</Link>
        <FormGroup>
        <FormControlLabel
          control={<Checkbox name="Terms" value="on"/>}
          label="Remember Me"
        />
      </FormGroup>
        <button className="ghost">Sign In</button>
      </form>
    </div>
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p className="text-center">To keep connected with us please login with your personal info or</p>
          <button onClick={(e) => handleClick(setClick(true))} className="ghost" id="signIn">
            Sign In
          </button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button onClick={(e) => handleClick(setClick(false))} className="ghost" id="signUp">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
          </Modal.Body>
        
        
      </Modal>
      </div>
    );
}

export default Test
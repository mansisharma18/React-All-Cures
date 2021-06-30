import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { makeStyles } from '@material-ui/core/styles';

import SocialButton from './styled/SocialButton'
import BrandButton from './styled/BrandButton'
import SlidingForm from './styled/SlidingForm'
import { Checkbox, FormGroup, FormControlLabel, RadioGroup, Radio, Select, MenuItem , FormControl, InputLabel} from '@material-ui/core'
import { Redirect } from 'react-router';
const FormSignup = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [repPass, setrepPass] = useState("");
  const [firstName, setFname] = useState("");
  const [lastName, setLname]= useState("");
  const [userType, setUserType] = useState("");
  const [terms, setTerms] = useState("");
  const [policy, setPolicy] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const [status, setStatus] = useState("");
  const [buttonClick, setClicked] = useState("");
  const [reload, setReload] = useState("");

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const SignUpForm = async (e, props) => {
    e.preventDefault();
    
    setClicked(1);
    const res = await fetch("/RegistrationActionController?", {
      method: "POST",
      body: `firstname=${firstName}&lastname=${lastName}&email=${email}&psw=${password}&psw-repeat=${repPass}&rempwd=off&doc_patient=${userType}&acceptTnC=${terms};&acceptPolicy=${policy}`,
      headers: {
      "Content-Type": "application/x-www-form-urlencoded"
      }
  });
  console.log('props '+props)
  console.log('status '+ res.status)
  console.log('Statusssssssssssssssss ',status)
  res.status === 404 
    ? console.log('Showw Error')
    : console.log('Redirect to page');

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

  function Success(){
    // setReload(true)
    return(
      <div className="alert alert-primary" role="alert">Success</div>
    )
  }
}
function Error(){
  // setReload(true)
  setTimeout(() => {
    return(
      <div className="alert alert-secondary" role="alert">Email or Password incorrect</div>
    )
  }, 1000);
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
  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  const handleTermsCheckbox = (event) => {
    setTerms(event.target.value)
  };

  const handlePolicyCheckbox = (event) => {
    setPolicy(event.target.value)
  }
  const classes = useStyles();

  console.log(firstName, lastName, password, email, terms, policy, userType)
  return(
    
    <SlidingForm signup className="text-center">
      <h1 className="text-center">Create Account</h1>
       <p className="text-center">or register with your email</p>
       <form onSubmit={SignUpForm}>
        { 
          buttonClick === 1? 
            status === 200 ? 
              Redirec()
              : Error()
            : console.log('Button not clicked')
        }
        <input 
          placeholder="First Name" 
          type="text" 
          name="firstName"
          onChange={
            e => setFname(e.target.value)
          }
          required
        />
        <input 
          placeholder="Last Name" 
          type="text" 
          name="lastName"
          onChange={
            e => setLname(e.target.value)
          }
          required
        />
        <input 
          placeholder="Email" 
          type="email" 
          name="email"
          onChange={
            e => setEmail(e.target.value)
          }
          required
        />
        <input 
          placeholder="Password" 
          type="password" 
          name="password"
          onChange={
            e => setPass(e.target.value)
          }
          required
        />
        <input 
          placeholder="Repeat Password" 
          type="password" 
          name="repPass"
          onChange={
            e => setrepPass(e.target.value)
          }
          required
        />

        <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
          <Select 
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={userType}
            onChange={handleChange}
            required
          >
          <MenuItem value="doctor">Doctor</MenuItem>
          <MenuItem value="patient">Patient/User</MenuItem>
        </Select>
        </FormControl>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="Terms" onChange={handleTermsCheckbox} value="on" required/>}
              label="Accept Terms & Conditions"
              required
            />
            <FormControlLabel
              control={<Checkbox name="Policy" onChange={handlePolicyCheckbox} value="on" required/>}
              label="Accept Policy"
              required
            />
          </FormGroup>
          <BrandButton type="submit">Sign up</BrandButton>

      </form>

    </SlidingForm>
  )
}

export default FormSignup

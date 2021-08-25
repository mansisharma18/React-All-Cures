import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';

import BrandButton from './styled/BrandButton'
import SlidingForm from './styled/SlidingForm'
import { Checkbox, FormGroup, FormControlLabel, Select, MenuItem , FormControl, InputLabel} from '@material-ui/core'
import { Redirect } from 'react-router';
import { Alert } from 'react-bootstrap';
import { usePasswordValidation } from '../hooks/usePasswordValidation';

const FormSignup = () => {

  const [email, setEmail] = useState("");
  // const [password, setPass] = useState("");
  const [password, setPassword] = useState({
    firstPassword: "",
    secondPassword: "",
   });
  // const [repPass, setrepPass] = useState("");
  const [firstName, setFname] = useState("");
  const [lastName, setLname]= useState("");
  const [userType, setUserType] = useState("");
  const [terms, setTerms] = useState("");
  const [policy, setPolicy] = useState("");
  const [rempwd, setRempwd] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const [status, setStatus] = useState("");
  const [buttonClick, setClicked] = useState("");
  const [region, setRname]= useState("");
  const [gender, setGname]= useState("");
  const [number, setMname]= useState("");
  // const [form, setForm]= useState("");

  const [promo, setPromo] =useState(1)
  const [validEmail, setValidEmail] = useState()

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
    var res;
    if(validEmail && upperCase && lowerCase && match){
      
     res = await fetch("/RegistrationActionController?", {
      method: "POST",
      body: `firstname=${firstName}&lastname=${lastName}&email=${email}&psw=${password.firstPassword}&psw-repeat=${password.secondPassword}&rempwd=${rempwd}&doc_patient=${userType}&acceptTnc=${terms}&number=${number}&gender=${gender}&region=${region}`,
      headers: {
      "Content-Type": "application/x-www-form-urlencoded"
      }
  }).then(response => console.log(response))
  .catch(res => console.log(res.data))

    // setStatus(res.status);
    // console.log('Statsus res ',res.status)
  // const data = await res.text();
  // console.log('dataaaaa ', res)
    // !data.hasOwnProperty("error")
    //   ? setMessage( 'success' )
    //   : setError( true );

    } else {
      console.log('not posssiiibbbllleee')
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
  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  const handleEmail = (e) => {
    var re= /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if(!re.test(e.target.value)){
      setValidEmail(false)
      console.log('Enter valid email')
      // return(
      //   <Alert className="alert alert-danger">Please enter valid email</Alert>
      // )
    } else {
      setEmail(e.target.value)
      setValidEmail(true)
      console.log('validEmail')
    }
  }
  const handleTermsCheckbox = (event) => {
    setTerms(event.target.value)
  };

  const handleRemember = (event) => {
    setRempwd(event.target.value)
  }
  const handlePolicyCheckbox = (event) => {
    setPolicy(event.target.value)
  }
  const classes = useStyles();

  console.log(firstName, lastName, password, email, terms, policy, userType, number, gender, region)
  return(
    
    <SlidingForm signup className="text-center">
      <h1 id='he2' className="text-center">Create Account</h1>
       <p id='p2'className="text-center">or register with your email</p>
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
            e => handleEmail(e)
          }
          required
        />
        
        <input 
          placeholder="Password" 
          type="password" 
          name="password"
          onChange={
            e => setFirst(e)
          }
          required
        />
        
 
        
        
        <input 
          placeholder="Mobile Number" 
          type="number" 
          name="number"
          onChange={
            e => setMname(e.target.value)
          }
          required
        />
        {
          buttonClick === 1?
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
          placeholder="Repeat Password" 
          type="password" 
          name="repPass"
          onChange={
            e => setSecond(e)
          }
          autoComplete="off"
          required
        />
        
        
        {
          promo?
          <input 
          placeholder="Promo Code" 
          type="text" 
          name="promo_code"
          value= {promo}
          disabled
          />
          : null
        }
               <label>
<input list="browsers" name="gender"placeholder="Gender"/></label>
<datalist id="browsers">
  <option value="Male"/>
  <option value="Female"/>
  <option value="Others"/>
  onChange={
            e => setGname(e.target.value)
          }
          required
  
</datalist>

<label>
<input list="country" name="region"placeholder="Region"/></label>
<datalist id="country">
  <option value="India"/>
  
  onChange={
            e => setRname(e.target.value)
          }
          required
  
</datalist>
        

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
          <MenuItem value="other">Other</MenuItem>
        </Select>
        </FormControl>

          <FormGroup>
            <FormControlLabel
              control={<Checkbox name="Terms" onChange={handleTermsCheckbox} value="on" required/>}
              label="Accept Terms & Conditions"
              required
            />
            <FormControlLabel
              control={<Checkbox name="remember_me" onChange={handleRemember} value="on"/>}
              label="Remember Me"
              required
            />
          </FormGroup>
          <BrandButton id='b2' type="submit">Sign up</BrandButton>

      </form>

    </SlidingForm>
  )
}

export default FormSignup

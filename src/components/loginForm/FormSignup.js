import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';

import BrandButton from './styled/BrandButton'
import SlidingForm from './styled/SlidingForm'
import { Checkbox, FormGroup, FormControlLabel, Select, MenuItem , FormControl, InputLabel} from '@material-ui/core';
import { Redirect } from 'react-router';
import { usePasswordValidation } from '../hooks/usePasswordValidation';
import axios from 'axios';
import history from '../history';

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
  // const [country, setCountry] = useState('')
  // const [state, setstate] = useState('')
  // const [city, setCity] = useState('')
  // const [countriesList,setCountriesList] = useState([])
  // const [statesList,setStatesList] = useState([])

  const [buttonClick, setClicked] = useState("");
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
      axios.post(`/RegistrationActionController?firstname=${firstName}&lastname=${lastName}&email=${email}&psw=${password.firstPassword}&psw-repeat=${password.secondPassword}&rempwd=${rempwd}&doc_patient=${userType}&acceptTnc=${terms}&number=${number}`
    ) .then(response => {
      if(response.data == 'Email Address already Exists in the System'){
        setExists(true);
        setTimeout(() => {
          setExists(false)
        }, 3500);
      }
      else if(response.data.registration_id){
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false)
        }, 3500);
      }
    })
      .catch(res => {
        setError(true) 
        console.log(res.data)
      })

    } else {
      console.log('not posssiiibbbllleee')
    }
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
    } else {
      setEmail(e.target.value)
      setValidEmail(true)
      console.log('validEmail')
    }
  }

//   const getCountries = () => {
//     axios.get('/article/all/table/countries')
//     .then(res => {
//         setCountriesList(res.data)
//     })
//     .catch(err => console.log(err))
// }

// const getStates = () => {
//   axios.get('/article/all/table/states')
//   .then(res => {
//       setStatesList(res.data)
//   })
//   .catch(err => console.log(err))
// }

// useEffect(() => {
//   getCountries()
// }, [])

// useEffect(() => {
//   getStates()
// }, [])
  const handleTermsCheckbox = (event) => {
    setTerms(event.target.value)
  };

  const handleRemember = (event) => {
    setRempwd(event.target.value)
  }

  const classes = useStyles();

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
  console.log(firstName, lastName, password, email, terms, policy, userType, number)
  return(
    
    <SlidingForm signup className="text-center">
      <h1 id='he2' className="text-center">Create Account</h1>
       <p id='p2'className="text-center">or register with your email</p>
       <form onSubmit={SignUpForm}>
        { 
          buttonClick == 1? 
            afterSignUp()
            : null
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
        
        <input 
          placeholder="Mobile Number" 
          type="number" 
          name="text"
          onChange={
            e => setMname(e.target.value)
          }
          required
        />
        
        {/* {
          promo?
          <input 
          placeholder="Promo Code" 
          type="text" 
          name="promo_code"
          value= {promo}
          disabled
          />
          : null
        } */}
        {/* <Form.Group className="col-md-12 float-left" >
          <FormControl component="fieldset">
      <FormLabel component="legend" className="text-dark">Gender</FormLabel>
      <RadioGroup value={gender.toString()} onChange={(e) => {setGender(e.target.value); console.log(e.target.value)}}
      >
        <FormControlLabel className="col-md-1" value="1" control={<Radio />} label="Female" />
        <FormControlLabel className="col-md-1" value="2" control={<Radio />} label="Male" />
        <FormControlLabel className="col-md-1" value="3" control={<Radio />} label="Other" />
      </RadioGroup>
      
    </FormControl>
    </Form.Group> */}
{/* 
    <label htmlFor="">Country</label>
                 <select name="country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" required="" class="form-control">
                     
                     {countriesList.map((lan) => {
                       console.log('Country: ', country)
                         return (
                             <option value={lan[0]}>{lan[1]}</option>
                         )
                     })}
                     
                 </select> */}
                 {/* <Form.Group className="col-md-12 float-left">
                    <Form.Label>Country</Form.Label>
                    <Form.Control as="select" value={country} name="countryId" custom
                    onChange={(e)=> setCountry(e.target.value)} placeholder="Country" required>
                    <option>Open this menu</option>
                                                    {countriesList.map((i) => (  
                                                        <option
                                                            value={i[0]}>
                                                            {i[1]}
                                                            </option>
                                                    ))}
                                            </Form.Control>
                                        </Form.Group> */}
        

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

import React, { Component, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { Form, Dropdown, DropdownButton } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import Heart from"../../assets/img/heart.png";
import { useHistory, Link} from 'react-router-dom'
import axios from 'axios';
import { Redirect } from "react-router-dom";


function LoginInfo(props) {  

    const [password, setPassword] = useState({
          firstPassword: "",
          secondPassword: "",
         });
    const [alert, setSubmitAlert] = useState(false)
    const [acPerm, setacPerm] = useState(Cookies.get('acPerm'))
    const [states, setStates] = useState([])
    const [uprn, setUprn] = useState('')
    const [selectedState, setSelectedState] = useState('')
    const [regNum, setRegNumber] = useState('')
    const [submitAlert, setAlert] = useState(False)
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

    const history = useHistory();

    const routeChange = (docid) =>{ 
        let path = `/profile/${docid}`; 
        history.push(path);
    }

    const submitForm = async (e) => {
        e.preventDefault()
        setSubmitAlert(true)
        if(validLength && upperCase && lowerCase && match && uprn && regNum && password.firstPassword && selectedState){
            axios.post(`/doctors/verification`, {
                "uprn": uprn,
                "registration_number": regNum,
                "password": password.firstPassword,
                "stateid": selectedState,
                "email": 'anil3.kumar@test.com',
                })
            .then(res => {
                setAlert(true);
                routeChange(res.data)
            })
            .catch(err => {
                console.log(err);
                console.log('error in Resetting')
            })
    
        }
    }
    
    useEffect(() => {
        Promise.all([
            fetch('/article/all/table/states').then(res => res.json()),
        ]).then(([statesData]) => {
            console.log('States Data: ',statesData)
                setStates(statesData);
            });
        }, [])

    const logout = async e => {
        const res = await fetch("/LogoutActionController", {
           method: "POST"
        });
        setTimeout(() => {
           window.location.reload()
        }, 1000);
     }

    return (
        <>
                        <div className="profilePage">
                <div className="comman-pg-header">
                    <section className="pageHeader zIndex-2 h-auto">
                    <div className="container">
                    <div className="row">
                        <div className="header" style={{width:"100%"}}>
                        <div className="logo"> 
                            <Link to='/home'>
                                <img src={Heart} alt="All Cures Logo"/>
                                <span>All Cures</span>
                            </Link>
                        </div>
    
                        <div className="loginSign">
                            <ToggleButton acPerm={acPerm} url={props.url} logout={logout}/> 
                        </div>   	
                        </div>
                    </div>
                    </div>
                    </section>
                </div>
                 </div>
                        <div className="container">
                <div className="h2 text-center my-3">Reset Your Password</div>
        <div className="card mb-5">
                    <div className="card-body">
                        <form>
                        <div className='LoginInfo'>
                            
                        
    
      </div>
                           
                            
                       <div className="d-flex flex-column  align-items-md-center">
                       <Form.Group className="col-md-6  " style={{zIndex: 1}}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={setFirst} type="Email" name="" placeholder="Enter Email" required/>
                            </Form.Group>
                            <Form.Group className="col-md-6  " style={{zIndex: 1}}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={setFirst} type="password" name="" placeholder="Enter Password" required/>
                            </Form.Group>
                            <Form.Group className="col-md-6 " style={{zIndex: 1}}>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control  type="password" name="" onChange={setSecond} placeholder="Confirm password" required/>
                            </Form.Group>
                            </div>
                            {
                                alert?
                                <div>
                                <ul>
                                  <li className="m-3">
                                    {validLength ? <span className="px-3 py-1 alert-success">Contains minimum amount of characters</span> : <span className="px-3 py-1 alert-danger">Minimum 8 characters required</span>}
                                  </li>
                                  {/* <li className="m-3">
                                    {hasNumber ? null : <span className="px-3 py-1 alert-danger">Should contain at least one numeric character</span>}
                                  </li> */}
                                  <li className="m-3">
                                    {upperCase ? <span className="px-3 py-1 alert-success">Contains uppercase character</span> : <span className="px-3 py-1 alert-danger">Should contain at least one uppercase character</span>}
                                  </li>
                                  <li className="m-3">
                                    {lowerCase ? <span className="px-3 py-1 alert-success">Contains Lowercase</span> : <span className="px-3 py-1 alert-danger">Should contain at least one lowercase character</span>}
                                  </li>
                                  <li className="m-3">{match ? <span className="px-3 py-1 alert-success">Passwords match</span> : <span className="px-3 py-1 alert-danger">Passwords do not match</span>}</li>
                                  {/* <li className="m-3">
                                    {specialChar ? null : <span className="px-3 py-1 alert-danger">Should contain at least one special character</span>}
                                  </li> */}
                              </ul>
                              </div>
                            //   :null
                              : null
                            }

{
                             submitAlert?
                             <Alert variant="success" className=" ">Password Reset Successfully</Alert>:null

                             }
                            <div className="d-flex flex-column align-items-sm-center">
                            <button onClick={submitForm} className="btn btn-dark col-md-4">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
            </>
      );
    }
    function ToggleButton(props) {
        if(props.acPerm){
            return(
                <DropdownButton style={{background: 'white'}} title="Hi there!">
                <Dropdown.Item >
                <Link to="/dashboard">
                   Dashboard
               </Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={props.logout}>Logout</Dropdown.Item>
             </DropdownButton>
            );
        }
        return(
            <Link 
             className="btn-white loginSignbtn color-blue-dark" 
             to={{pathname: props.url, search: '?login=true', state: {open: true}}}
            >
                Sign Up
            </Link>
        )
    }
    export default LoginInfo;
import React, { Component, useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { Alert,Form, Dropdown, DropdownButton } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import Heart from"../../assets/img/heart.png";
import { useHistory, Link} from 'react-router-dom'
import axios from 'axios';
import history from '../history'
import { Redirect } from "react-router-dom";
import { Mail } from '@material-ui/icons';


function LoginInfo(props) {  
const[email,setEmail] = useState(
    {
        Mail: "",
    }
);
    const [password, setPassword] = useState({
          firstPassword: "",
          secondPassword: "",
         });
    const [alert, setSubmitAlert] = useState(false)
    const [acPerm, setacPerm] = useState(Cookies.get('acPerm'))
    const [states, setStates] = useState([])
  
    const [selectedState, setSelectedState] = useState('')
  
    const [submitAlert, setAlert] = useState(false)
    const [notAlert, noAlert] = useState(false)
    const [errAlert, erAlert] = useState(false)
    const [
        validLength,
        hasNumber,
        upperCase,
        lowerCase,
        match,
        specialChar,
    ] = usePasswordValidation({
        Mail: email.Mail,
  
    });
    
    const setMail = (event)=>{
        setEmail({ ...email,Mail: event.target.value})
    }
    const setFirst = (event) => {
      setPassword({ ...password, firstPassword: event.target.value });
    };
    const setSecond = (event) => {
      setPassword({ ...password, secondPassword: event.target.value });
    };

    

    const submitForm = async (e) => {
        e.preventDefault()
        
        setSubmitAlert(true)
        if(email.Mail){
            axios.post(`/users/checkemail`,
            {
                "email": email.Mail
            })
            .then(res => {
                if(res.data == 1){
                    setAlert(true)
                    setTimeout(()=>{
                        setAlert(false)
                        
                    },4000)
                
            }else {
                noAlert(true)
                setTimeout(()=>{
                    noAlert(false)
                },4000)
            }
           
          
        }
            )
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
                <div className="h2 text-center my-3">Verify Your Email</div>
        <div className="card mb-5">
                    <div className="card-body">
                        <form>
                        <div className='LoginInfo'>
                            
                        
    
      </div>
                           
                            
                       <div className="d-flex flex-column  align-items-md-center">
                       <Form.Group className="col-md-6  " style={{zIndex: 1}}>
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={setMail} type="Email" name="" placeholder="Enter Email" required/>
                            </Form.Group>
                           
                            </div>
                          

{
                   submitAlert?
                   <Alert variant="success" className="h6 mx-3">Check Your Email!</Alert>
                   : null
                             }
                             
                             {
                   notAlert?
                   <Alert variant="danger" className="h6 mx-3">Email not found!</Alert>
                   : null
                             }
{
                  errAlert?
                   <Alert variant="danger" className="h6 mx-3">Error in Resetting</Alert>
                   : null
                             }
                            <div className="d-flex flex-column align-items-sm-center">
                            <button onClick={submitForm} className="btn btn-dark col-md-4">Verify</button>
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
import React, { Component, useState, useEffect } from 'react';

import Cookies from 'js-cookie';
import { usePasswordValidation } from "../hooks/usePasswordValidation";
import { Alert,Form, Dropdown, DropdownButton } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import Heart from"../../assets/img/heart.png";
import { useHistory, Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import history from '../history'
import { useParams } from "react-router-dom";
import '../../assets/healthcare/css/main.css';
import Input from '@material-ui/core/Input';
import { Checkbox, FormGroup, FormControlLabel, Select, MenuItem , FormControl, InputLabel,TextField} from '@material-ui/core'

function LoginInfo(props) {  
const[number,setNumber] = useState('');
const [countriesList,setCountriesList] = useState([])
    const [alert, setSubmitAlert] = useState(false)
    const [acPerm, setacPerm] = useState(Cookies.get('acPerm'))
    const [states, setStates] = useState([])
    const [type,setType] = useState([])
    const [selectedState, setSelectedState] = useState('')
    const [submitAlert, setAlert] = useState(false)
    const [notAlert, noAlert] = useState(false)
    const [errAlert, erAlert] = useState(false)
    const [disease, setDisease] = useState([])
    const [cures, setCures] = useState([])
    const [diseaseList, setDiseaseList] = useState([])
    const setMail = (event)=>{
        setNumber({ ...number,Mail: event.target.value})
    }
     
  const putSubscribe= async e => {
       e.preventDefault()
    axios.post('/users/unsubscribe/7889761896',
  {   
 "nl_subscription_disease_id":1,
  "nl_sub_type":1,
  "nl_subscription_cures_id": 0
  })
  .then(res => {
      console.log(res)
  })
  .catch(err => console.log(err))
   }
    

       
      
        
    
    useEffect(() => {

        // const params = new URLSearchParams(location.search);
        // const getEmail= params.get('em');
      
       const getEmail = props.location.search
       
         axios.post(`/users/getemdecrypt`,
         {
             "email":getEmail.split('em=')[1]
         })
         .then(res => {
            setNumber(res.data)
         })
         
    
     
        getDisease()

         
        }, [])

    // const logout = async e => {
    //     const res = await fetch("/LogoutActionController", {
    //        method: "POST"
    //     });
    //     setTimeout(() => {
    //        window.location.reload()
    //     }, 1000);
    //  }
     const handleSelect = function(countries) {
        const flavors = [];
        for (let i=0; i<countries.length; i++) {
            flavors.push(countries[i].value);
        }
        setType(flavors);
    }
    const getDisease = () => {
        axios.get('/article/all/table/disease_condition')
        .then(res => {
            console.log(res.data);
            setDiseaseList(res.data)
        })
        .catch(err => console.log(err))
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
                            {/* <ToggleButton acPerm={acPerm} url={props.url} logout={logout}/>  */}
                        </div>   	
                        </div>
                    </div>
                    </div>
                    </section>
                </div>
                 </div>
                        <div className="container">
                <div className="p text-center my-3">We Didnt feel good as you have unscbscribed us . Hope You wil subscribe as soon</div>
        <div className="card mb-5">
      
                   
                        <form>
                       
                           
     
                       
      <div className="d-flex flex-column align-items-sm-center">
                            {/* <button onClick={putSubscribe} className="btn btn-dark col-md-4" >Submit</button> */}
                            </div>
                        </form>
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
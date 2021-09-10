import React, { Component, useState, useEffect } from 'react';

import { Alert,Form, Dropdown, DropdownButton } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import Heart from"../../assets/img/heart.png";
import { useHistory, Link, Redirect} from 'react-router-dom'
import axios from 'axios';

import '../../assets/healthcare/css/main.css';
import Input from '@material-ui/core/Input';
import { Checkbox, FormGroup, FormControlLabel, Select, MenuItem , FormControl, InputLabel,TextField} from '@material-ui/core'

function LoginInfo(props) {  
const[number,setNumber] = useState('');

    const [type,setType] = useState([])
   
    const [disease, setDisease] = useState([])
    const [cures, setCures] = useState([])
    const [diseaseList, setDiseaseList] = useState([])
       
    const [subscribeList, setSubscribeList] = useState([])
    const setMail = (event)=>{
        setNumber({ ...number,Mail: event.target.value})
    }
     
  const putSubscribe= async e => {
       e.preventDefault()
    axios.post('/users/subscribe/7889761896',
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
    

       
//    const getSubscribe = () => {
    
//     axios.get(`/subscriptiondetails/7889761896`)
//     .then(res => {
//       console.log(res.data[0].subscribeVal)
//       setSubscribeValue(res.data)
//     })
//     .catch(err => console.log(err))
//   }
//   React.useEffect(() => {
//     getSubscribe()
  
//   },[])
getSubscribe()
const getSubscribe = () => {
    axios.get('/subscriptiondetails/7889761896')
    .then(res => {
        console.log(res.data);
        setSubscribeList(res.data)
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
                <div className="h2 text-center my-3">Edit Subscribe</div>
        <div className="card mb-5">
      
                    <div className="card-body">
                        <form>
                        <div className='LoginInfo'>
                            
                        
    
      </div>
                           
      <div className="row">
                  
      <div className="col-lg-6 form-group">
                    <label htmlFor="">Type</label>
                    <select 
                    multiple
               
                    name="type" placeholder="Type" 
                    value={type} 
                    
                    onChange={(e)=> {
                        handleSelect(e.target.selectedOptions)
                    }}
                    required class="form-control">
                        <option value="1">All</option>
                        <option value="2">Disease</option>
                        <option value="3">Cures</option>
                    </select>
                </div>
                       <Form.Group className="col-lg-6  " style={{zIndex: 1}}>
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control disabled onChange={setMail} value={number} type="Email" name="" required/>
                            </Form.Group>


                              {   
                    type?
                    type.indexOf('2') === -1 
                    ? null 
                    :                             <div className="col-lg-6 form-group">
                    <label htmlFor="">Disease</label>
                        <Select multiple
                        value={disease}
                        onChange={(e) =>  setDisease(e.target.value)}
                        input={<Input id="select-multiple-chip" />}
                        // MenuProps={MenuProps}
                        className="form-control">
                        {diseaseList.map((lan) => {
                            return (
                                <MenuItem key={lan[0]}value={lan[0]} >
                                    {lan[1]}
                                </MenuItem>
                            )
                        })}
                        </Select>
                </div>
                    : null
                } 
                  {   
                    type?
                    type.indexOf('3') === -1 
                    ? null 
                    :  <div className="col-lg-6 form-group">
                    <label htmlFor="">Cure</label>
                        <Select multiple
                        value={cures}
                        onChange={(e) =>  setCures(e.target.value)}
                        input={<Input id="select-multiple-chip" />}
                        // MenuProps={MenuProps}
                        className="form-control">
                        {diseaseList.map((lan) => {

                            return (
                                <MenuItem key={lan[0]}value={lan[0]} >
                                    {lan[1]}
                                </MenuItem>
                            )
                        })}
                        </Select>
                </div>
                    : null
                } 
                
                
                </div> 
                       
      <div className="d-flex flex-column align-items-sm-center">
                            <button onClick={putSubscribe} className="btn btn-dark col-md-4" >Submit</button>
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
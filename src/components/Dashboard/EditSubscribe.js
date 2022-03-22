import React, { useState, useEffect } from 'react';

import { Form } from 'react-bootstrap';
import Footer from '../Footer/Footer';
import Heart from"../../assets/img/heart.png";
import { Link } from 'react-router-dom'
import { backendHost } from '../../api-config';
import { userId } from '../UserId';

import axios from 'axios';

import '../../assets/healthcare/css/main.css';
import Input from '@material-ui/core/Input';
import { Select, MenuItem } from '@material-ui/core';
import Userprofile from '../Profile/Userprofile';

function LoginInfo(props) { 
    
    const[number,setNumber] = useState();
    const [mobile, setMobile] = useState('')
    const [subnum, setSubnum] = useState('')
    
    const [isLoaded, setLoaded] = useState(false)

    const [type,setType] = useState([])
   
    const [disease, setDisease] = useState([])
    const [cures, setCures] = useState([])
    const [diseaseList, setDiseaseList] = useState([])
    const setMail = (event)=>{
        setNumber({ ...number,Mail: event.target.valueAsNumber})
    }
     
  const putSubscribe= async e => {
       e.preventDefault()
    axios.post(`${backendHost}/users/subscribe/${mobile}`,
  {   
 "nl_subscription_disease_id":1,
  "nl_sub_type":1,
  "nl_subscription_cures_id": 0
  }) 
  
  .then(res => {
               
   
    // window.location.reload(false);
})

.then(err => {
    return
})
.catch(err => {return}
)




   }
  const postSubscribtion= async e=> {
    //  var mobileNumber = this.state.mobile.split('+')
    var phoneNumber = this.state.value.split('+')[1]
    var countryCodeLength = phoneNumber.length % 10
    var countryCode = phoneNumber.slice(0, countryCodeLength)
    var StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, '')
     if(phoneNumber){
       this.setState({
          afterSubmitLoad: true
       })
      axios.post(`${backendHost}/users/subscribe/${mobile}`, {
      "nl_subscription_disease_id":this.state.disease.join(','),
      "nl_sub_type": this.state.type.indexOf('1') === -1 ? 0: 1,
      "nl_subscription_cures_id":this.state.cures.join(','),
      "country_code": countryCode,
      })
        .then(res => {
         this.setState({
            afterSubmitLoad: false
         })
         if(res.data === 1){
            this.Alert('You have successfully subscribed to our Newsletter')
         }
         else {
            this.Alert('Some error occured! Please try again later.')
         }
        })
        .catch(err => {
         this.setState({
            afterSubmitLoad: false
         })
         this.Alert('Some error occured! Please try again later.')
         
   
      })
     } else {
        this.Alert('Please enter a valid number!')
     }
  }
   const getProfile = () => {
    axios.get(`${backendHost}/profile/${userId}`)
    .then(res => {
        
        setMobile(res.data.mobile_number)
        // setRegType(res.data.registration_type)
        setLoaded(true)
       
    })
    .catch(err => {return})
}



    useEffect(() => {

        // const params = new URLSearchParams(location.search);
        // const getEmail= params.get('em');
      
       const getEmail = props.location.search
       
         axios.post(`${backendHost}/users/getemdecrypt`,
         {
             "email":getEmail.split('em=')[1]
         })
         .then(res => {
            setNumber(res.data)
         })
         
    
     
        getDisease()
        getProfile()
         // eslint-disable-next-line
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
        axios.get(`${backendHost}/article/all/table/disease_condition`)
        .then(res => {
            setDiseaseList(res.data)
        })
        .catch(err => {return})
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
                    required className="form-control">
                        <option value="1">All</option>
                        <option value="2">Disease</option>
                        <option value="3">Cures</option>
                    </select>
                </div>
                       <Form.Group className="col-lg-6  " style={{zIndex: 1}}>
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control  onChange={setMobile} value={mobile} inputmode="numeric" type="number" name="" required/>
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
                            <button onClick={postSubscribtion} className="btn btn-dark col-md-4" >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
            </>
      );
    }

export default LoginInfo;       
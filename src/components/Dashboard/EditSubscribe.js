import React, { useState, useEffect, Component } from 'react';

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
import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
class LoginInfo extends Component{
    constructor(props){
        super(props);
        this.childDiv = React.createRef()
        this.state = { 
          items: [],
          carouselItems: [],
          comment: [],
          isLoaded: false,
          ratingValue: '',
          rating:[],
          ratingVal:[],
          param : this.props.match.params,
          disease_name: '',
          regions: '',
          regionPostsLoaded: false,
          regionalPost: [],
          showMore: false,
          value:'',
          type: [],
          favourite: [],
          disease_nameList:[],
          disease_name:[],
          cures:[],
          showAlert: false,
          alertMsg: '',
          showCuresCards: false,
          number:'',
          mobile:'',
          subnum:'',
          isLoaded:false,
          searchParams: {
            city: '',
            Pincode: '',
            name: '',
            subscription: '',  
         }
        };
      }

      Alert = (msg) => {
        this.setState({
           showAlert:true,
           alertMsg: msg
        })
        setTimeout(() => {
           this.setState({
              showAlert: false
           })
        }, 5000);
      }
    
   
  
 postSubscribtion= (mobile)=> {
    //  var mobileNumber = this.state.mobile.split('+')
   // var phoneNumber = this.state.value.split('+')[1]
    //var countryCodeLength = phoneNumber.length % 10
    //var countryCode = phoneNumber.slice(0, countryCodeLength)
    //var StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, '')
     
      axios.post(`${backendHost}/users/subscribe/${mobile}`, {
      "nl_subscription_disease_name_id":this.state.disease_name.join(','),
      "nl_sub_type": this.state.type.indexOf('1') === -1 ? 0: 1,
      "nl_subscription_cures_id":this.state.cures.join(','),
      //"country_code": countryCode,
      })
        .then(res => {
         this.setState({
            afterSubmitLoad: true
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
        // this.Alert('Some error occured! Please try again later.')
         
   
      })
     } 
   getProfile = () => {
    axios.get(`${backendHost}/profile/${userId}`)
    .then(res => {
        this.setState({
          mobile:res.data.mobile_number,
          loaded:true,
          
          
        },
        () => {
            this.getSubsnum()
          
          });
        
       
    })
    
   
    .catch(err => {return})
}

getSubsnum=() =>{
    
    
     axios.get(`${backendHost}/users/subscriptiondetails/${this.state.mobile}/cc/91`)
     
     .then((res) => {

        this.setState({
           // subnum:res.data.length,
            //disease_name:res.data.disease_name_name,
            loaded:true,

          })
      
     })
     .catch(err => {return})
   }

    

    // const logout = async e => {
    //     const res = await fetch("/LogoutActionController", {
    //        method: "POST"
    //     });
    //     setTimeout(() => {
    //        window.location.reload()
    //     }, 1000);
    //  }
    handleSelect = function(subs) {
        const flavors = [];
        for (let i=0; i<subs.length; i++) {
            flavors.push(subs[i].value);
        }
        this.setState({
          type:flavors
        })
    }
    handleChange = e => {
        e.preventDefault();
        this.setState({
            disease_name: e.target.value 
        });
      }
     getDisease = () => {
        axios.get(`${backendHost}/article/all/table/disease_name_condition`)
        .then(res => {
            this.setState({
                disease_nameList:res.data
              })
        })
        .catch(err => {return})
     }
     componentDidMount() {
        window.scrollTo(0, 0);
        
        
        this.getDisease()
        this.getProfile(this.state.mobile)
      
        
        
      }
      
    
    render() { 
        var { isLoaded, items, carouselItems,mobile } = this.state;
    return (
        <>
        <div>
        {
                this.state.afterSubmitLoad &&
                <div className="loader main on-submit-loading">
                  <img src={Heart} alt="All Cures Logo" id="heart"/>
                </div>
            } {
                this.state.showAlert &&
                    <div className="alert alert-success pop-up border-bottom">
                        <div className="h5 mb-0 text-center">{this.state.alertMsg}</div>
                        <div className="timer"></div>
                    </div>
            }</div>
        
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
                    value={this.state.type} 
                    
                    onChange={(e)=> {
                        this.handleSelect(e.target.selectedOptions)
                    }}
                    required className="form-control">
                        <option value="1">All</option>
                        <option value="2">Disease</option>
                        <option value="3">Cures</option>
                    </select>
                </div>
                      
                <Form.Group className="col-lg-6  " style={{zIndex: 1}}>
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control   value={this.state.mobile} inputmode="numeric" type="number" name="" required/>
                            </Form.Group>

                              {   
                    this.state.type?
                    this.state.type.indexOf('2') === -1 
                    ? null 
                    :                             <div className="col-lg-6 form-group">
                    <label htmlFor="">Disease</label>
                        <Select multiple
                        value={this.state.disease_name}
                        onChange={(e) =>  this.setState({
                            disease_name:e.target.value
                          })
                            }
                        input={<Input id="select-multiple-chip" />}
                        // MenuProps={MenuProps}
                        className="form-control">
                        {this.state.disease_nameList.map((lan) => {
                            return (
                                <MenuItem key={lan[0].toString()} value={lan[0]} >
                                    {lan[1]}
                                </MenuItem>
                            )
                        })}
                        </Select>
                </div>
                    : null
                } 
                  {   
                    this.state.type?
                    this.state.type.indexOf('3') === -1 
                    ? null 
                    :  <div className="col-lg-6 form-group">
                    <label htmlFor="">Cure</label>
                        <Select multiple
                        value={this.state.cures}
                        onChange={(e) =>   this.setState({
                            cures:e.target.value
                          })}
                        input={<Input id="select-multiple-chip" />}
                        // MenuProps={MenuProps}
                        className="form-control">
                        {this.state.disease_nameList.map((lan) => {

                            return (
                               
                                <MenuItem key={lan[0].toString()} value={lan[0]} >
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
      <button className="bcolor rounded py-2" onClick={( ) => {this.postSubscribtion(this.state.mobile)}}>
                                   Submit
                                </button>
                
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
            </>
      );
    }
}

export default LoginInfo;
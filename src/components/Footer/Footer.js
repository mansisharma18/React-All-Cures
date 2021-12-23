import React, { Component } from 'react';
import { backendHost } from '../../api-config';
import axios from 'axios';
import Heart from"../../assets/img/heart.png";
import Facebook from '../../assets/icon/facebook.svg'
import Instagram from '../../assets/icon/instagram.svg'
import Linkedin from '../../assets/icon/linkedin.svg'
import Twitter from '../../assets/icon/twitter.svg'
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


class Footer extends Component {
   constructor(props){
      super(props);
      
      this.state = {
         afterSubmitLoad: false,
         showAlert: false,
         alertMsg: '',
      
         value:'',
         texts: '',
       
         mobile: '',
     
          searchParams: {
           
            subscription: '',
           
          
        }
        
    };      
  }
  postSubscribtion() {
   //  var mobileNumber = this.state.mobile.split('+')
   console.log('value: ', this.state.value)
   var phoneNumber = this.state.value.split('+')[1]
   console.log(phoneNumber)
   var countryCodeLength = phoneNumber.length % 10
    console.log('Country COde:', countryCodeLength)
   var countryCode = phoneNumber.slice(0, countryCodeLength)
   console.log(countryCode)
   var StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, '')
   console.log(StringValue)
    if(phoneNumber){
      this.setState({
         afterSubmitLoad: true
      })
     axios.post(`${backendHost}/users/subscribe/${StringValue}`, {
     "nl_subscription_disease_id": "0",
     "nl_sub_type":1,
     "nl_subscription_cures_id":"0",
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
 render() {
   return(
      <div>
            {
                this.state.afterSubmitLoad &&
                <div className="loader main on-submit-loading">
                    <i className="fa fa-spinner fa-spin fa-10x" />
                </div>
            }
            {
                this.state.showAlert &&
                    <div className="alert alert-success pop-up border-bottom">
                        <div className="h5 mb-0 text-center">{this.state.alertMsg}</div>
                        <div className="timer"></div>
                    </div>
            }
                  <section className="footer">
         <div className="container">
            <div className="row">
               <div className="col-md-4 col-sm-4 col-sx-12">
                  <div className="footer-inner" >
                     <h1>About us</h1>
                     <p >We are a new age healthcare technology firm who are trying make it simple and convenient for the users to get information 
                        on Cures from anywhere in the world.
                        We are passionate about giving our users the unique experience that is both fulfilling and wholesome.</p>
                  </div>
               </div>
               <div className="col-md-2 col-sm-2 col-sx-12">
                  <div className="footer-inner" id="none">
                     <h1>Top Cures</h1>
                     <ul>
                        {/* <li>
                           <a className="text-light"></a>
                        </li> */}
                         <Link to={ `/cures/Cough And Cold` }>
                          
                           
                              <li>
                                 <a className="text-light">Cough Cold</a></li>
                           
                        </Link>
                        <Link to={ `/cures/Diabetes` }>
                        <li>
                           <a className="text-light">Diabetes Care</a>
                        </li>
                        </Link>
                        <Link to={ `/cures/Cardiology` }>
                        <li>
                           <a className="text-light">Heart Care </a>
                        </li>
                        </Link>
                        <Link to={ `/cures/Dental` }>
                        <li>
                           <a className="text-light">Dental Care</a>
                        </li>
                        </Link>
                        <Link to={ `/cures/Dermatology` }>
                        <li>
                           <a className="text-light">Skin Care</a>
                        </li>
                        </Link>
                        <Link to={ `/cures/ENT` }>
                        <li>
                           <a className="text-light">Eye Care</a>
                        </li>
                        </Link>
                        {/* <li>
                           <a href="/#">Urologist</a>
                        </li> */}
                        {/* <li>
                           <a href="/#">Gastroenterologist</a>
                        </li> */}
                        
                        {/* <li>
                           <a href="/#"> View all</a>
                        </li> */}
                     </ul>
                  </div>
               </div>
               
               <div className="col-md-3 col-sm-3 col-sx-12">
                  <div className="footer-inner" id="none">
                     <h1>Discover</h1>
                     <ul>
                     <Link  to="/article">

                        <li>
                           <a className="text-light">Create A Cure</a>
                        </li>
                        </Link>
                       
                       
                     </ul>
                  </div>
               </div>
               <div className="col-md-3 col-sm-3 col-sx-12">
                  <div className="footer-inner">
                     {/* <h1>Our Mission</h1>
                     <p> We are a new age healthcare technology firm who are trying make it simple and convenient for the users to get information on Cures from anywhere in the world.</p> */}
                     <h1 className="helth-app">
                        <div className="h6">Subscribe to our Newsletter</div>
                        {/* <form onSubmit={(e) => this.postSubscribtion(e)}> */}
                        <PhoneInput
      placeholder="Enter phone number"
      value={this.state.value}
      defaultCountry='in'
    
       onChange={(newValue) => {
                                 this.setState({
                                    value: newValue
                                 })
                              }}
                              />
                        {/* <PhoneInput className="rounded form-input" placeholder="Enter your number" type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} required/> */}
                        {/* <button className="btn appBtn rounded" type="submit" >Subscribe</button> */}
                        <button className="btn appBtn rounded" onClick={( ) => {this.postSubscribtion()}}>
                                   Subscribe
                                </button>
                        {/* <a href="/#" className="appBtn">Google Play</a> */}
                        {/* </form> */}
                     </h1>
                  </div>
               </div>
            </div>
         </div>
        
      </section>
      <div class="footer-bootm">
         <div class="container">
            <div class="row">
            <div className='col-xs-12 disclaimer mb-3'>
               Disclaimer: Content available on All Cures website is not intended to be a substitute for professional medical advice, diagnosis, or treatment. It is strongly recommended to consult your physician or other qualified medical practitioner with any questions you may have regarding a medical condition. The website should not be used as a source for treatment of any medical condition.
               </div>
             
              
               <div class="col-md-4 col-sm-4 col-sx-12">
                  <div class="logo">
                     <a href="/#">
                        <img src={Heart} alt="All Cures Logo" /><span>All Cures</span>
                    </a>
                  </div>
               </div>
               
               <div class="col-md-4 col-sm-4 col-sx-12">
                  <div class="copyRight">
                     <p>All rights reserved. Copyright <i class="far fa-copyright fa-1x"></i>2020</p>
                  </div>
               </div>

               <div class="col-md-4 col-sm-4 col-sx-12" id="social">
                  <div class="socia-media-footer">
                     <ul>
                        <li>
                           <a href="https://www.facebook.com/All-Cures-100610265834385" target="_blank">
                              <span>
                                 <img src={Facebook} alt="Facebook Link" height="30px" width="30px"></img>
                              </span> 
                              <span class="path1"></span>
                              <span class="path2"></span>
                           </a>
                        </li>
                        <li>
                           <a href="https://www.instagram.com/allcuresinfo/" target="_blank">
                              <span>
                                 <img src={Instagram} alt="Instagram Link" height="30px" width="30px"></img>
                              </span> 
                              <span class="path1"></span>
                              <span class="path2"></span>
                           </a>
                        </li>
                        <li>
                           <a href="https://twitter.com/allcuresinfo" target="_blank">
                              <span>
                                 <img src={Twitter} alt="Twitter Link" height="30px" width="30px"></img>
                              </span> 
                              <span class="path1"></span>
                              <span class="path2"></span>
                           </a>
                        </li>
                        <li>
                           <a href="https://www.linkedin.com/company/etherium-technologies/" target="_blank">
                              <span>
                                 <img src={Linkedin} alt="LinkedIn Link" height="30px" width="30px"></img>
                              </span> 
                              <span class="path1"></span>
                              <span class="path2"></span>
                           </a>
                        </li>
                        {/* <li>
                        <a href="/#">
                              <span>
                                 <img src={Twitter} alt="Twitter Link" height="30px" width="30px"></img>
                              </span> 
                              <span class="path1"></span>
                              <span class="path2"></span>
                           </a>
                        </li> */}
                     </ul>
                  </div>
               </div>
               <div className="back-top">
               <a href="#" id="scroll"style={{display: "block"}} >
                   <span></span>
                  
                </a>
                </div>
             
            </div>
            <div className='row'>
            
        </div>
      
        </div>
       
    </div>

            </div>
     
      );
   }









}
export default Footer;
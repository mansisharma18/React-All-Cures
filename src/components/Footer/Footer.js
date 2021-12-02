import React, { useEffect, useState } from 'react';
import { backendHost } from '../../api-config';
import axios from 'axios';
import Heart from"../../assets/img/heart.png";
import Facebook from '../../assets/icon/facebook.svg'
import Instagram from '../../assets/icon/instagram.svg'
import Linkedin from '../../assets/icon/linkedin.svg'
const Footer = () => {
   const [showAlert, setShowAlert] = useState(false)
   const [alertMsg, setAlertMsg] = useState(true)
   const [mobile, setMobile] = useState('')

   function Alert(msg){
      setShowAlert(true)
      setAlertMsg(msg)
      setTimeout(() => {
         setShowAlert(false)
      }, 20000);
   }

   function postSubscribtion() {
      axios.post(`${backendHost}/users/subscribe/${mobile}`, {
      "nl_subscription_disease_id": 1,
      "nl_sub_type":1,
      "nl_subscription_cures_id":0,
      })
        .then(res => {
           res===1 &&
         Alert('You have successfully subscribed to our Newsletter.')
         setMobile('')
        })
        .catch(err => {
           Alert('Some Error Occurred. Please try again later.')
      })   
   }

        return(
            <div>
               {
                  showAlert &&
                  <div className="alert pop-up border-bottom">
                     <div className="h5 mb-0 text-center">{alertMsg}</div>
                  </div>
               }
            <section className="footer">
         <div className="container">
            <div className="row">
               <div className="col-md-4 col-sm-4 col-sx-12">
                  <div className="footer-inner" >
                     <h1>About us</h1>
                     <p >We are a new age healthcare technology firm who are trying make it simple and convenient for the users to get information 
                        on Cures from anywhere in the world.With over 20 years of experience building technology products in the healthcare segment, 
                        our team is developing an integrated platform for all your health needs. 
                        We are passionate about giving our users the unique experience that is both fulfilling and wholesome.</p>
                  </div>
               </div>
               <div className="col-md-2 col-sm-2 col-sx-12">
                  <div className="footer-inner">
                     <h1>Top Specialties</h1>
                     <ul>
                        <li>
                           <a href="/#"> Primary Care Doctor</a>
                        </li>
                        <li>
                           <a href="/#">Dermatologist</a>
                        </li>
                        <li>
                           <a href="/#">OB-GYN Dentist </a>
                        </li>
                        <li>
                           <a href="/#">Psychiatrist</a>
                        </li>
                        <li>
                           <a href="/#">Ear, Nose & Throat Doctor</a>
                        </li>
                        <li>
                           <a href="/#">Podiatrist</a>
                        </li>
                        <li>
                           <a href="/#">Urologist</a>
                        </li>
                        <li>
                           <a href="/#">Gastroenterologist</a>
                        </li>
                        
                        <li>
                           <a href="/#"> View all</a>
                        </li>
                     </ul>
                  </div>
               </div>
               
               <div className="col-md-3 col-sm-3 col-sx-12">
                  <div className="footer-inner">
                     <h1>Discover</h1>
                     <ul>
                        <li>
                           <a href="/#">The Paper Gown</a>
                        </li>
                        <li>
                           <a href="/#">Stories for and about patients</a>
                        </li>
                        <li>
                           <a href="/#">The Script</a>
                        </li>
                        <li>
                           <a href="/#">Insights for doctors</a>
                        </li>
                        <li>
                           <a href="/#">Community Standards </a>
                        </li>
                        <li>
                           <a href="/#">Data and privacy </a>
                        </li>
                        <li>
                           <a href="/#">Verified reviews</a>
                        </li>
                     </ul>
                  </div>
               </div>
               <div className="col-md-3 col-sm-3 col-sx-12">
                  <div className="footer-inner">
                     {/* <h1>Our Mission</h1>
                     <p> We are a new age healthcare technology firm who are trying make it simple and convenient for the users to get information on Cures from anywhere in the world.</p> */}
                     <h1 className="helth-app">
                        <div className="h6">Subscribe to our Newsletter</div>
                        <form onSubmit={(e) => postSubscribtion()}>
                        <input className="rounded form-input" placeholder="Enter you number" value={mobile} onChange={(e) => setMobile(e.target.value)} required/>
                        <button className="btn appBtn rounded" type="submit" >Subscribe</button>
                        {/* <a href="/#" className="appBtn">Google Play</a> */}
                        </form>
                     </h1>
                  </div>
               </div>
            </div>
         </div>
        
      </section>
      
      <div className="footer-bootm">
         <div className="container">
            <div className="row">
               <div className="col-md-4 col-sm-4 col-sx-12">
                  <div className="logo">
                     <a href="/#">
                        <img src={Heart} alt="All Cures Logo" /><span>All Cures</span>
                    </a>
                  </div>
               </div>
               <div className="col-md-4 col-sm-4 col-sx-12">
                  <div className="copyRight">
                     <p>All rights Reserved. Copyright @ 2020</p>
                  </div>
               </div>
               <div className="col-md-4 col-sm-4 col-sx-12">
                  <div className="socia-media-footer">
                     <ul>
                        <li>
                           <a href="https://www.facebook.com/Etherium-Technologies-100724305715107/">
                              <span>
                                 <img src={Facebook} alt="Facebook Link" height="30px" width="30px"></img>
                              </span> 
                              <span className="path1"></span>
                              <span className="path2"></span>
                           </a>
                        </li>
                        <li>
                           <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                              <span>
                                 <img src={Instagram} alt="Instagram Link" height="30px" width="30px"></img>
                              </span> 
                              <span className="path1"></span>
                              <span className="path2"></span>
                           </a>
                        </li>
                        <li>
                           <a href="https://www.linkedin.com/company/etherium-technologies/">
                              <span>
                                 <img src={Linkedin} alt="LinkedIn Link" height="30px" width="30px"></img>
                              </span> 
                              <span className="path1"></span>
                              <span className="path2"></span>
                           </a>
                        </li>
                        {/* <li>
                        <a href="/#">
                              <span>
                                 <img src={Twitter} alt="Twitter Link" height="30px" width="30px"></img>
                              </span> 
                              <span className="path1"></span>
                              <span className="path2"></span>
                           </a>
                        </li> */}
                     </ul>
                  </div>
               </div>
               <div className="back-top">
               <a href="/" id="scroll" className="d-none" >
                   <span></span>
                  
                </a>
                </div>
             
            </div>
        </div>
    </div>
    </div>
   );
}
export default Footer;
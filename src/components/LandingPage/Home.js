import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Heart from"../../assets/img/heart.png";
import Doct from "../../assets/img/doct.png";

import '../../assets/healthcare/css/main.css';
import '../../assets/healthcare/css/responsive.css';
import '../../assets/healthcare/css/animate.css';
import '../../assets/healthcare/icomoon/style.css';

import Carousel1 from './Caousel1';
import Carousel2 from './Carousel2';
import CarouselReview from './CarouselReview';
// import ToggleButton from '../Header/Header'

class Home extends Component {
   constructor(props){
      super(props);
      this.state = {
          acPerm: Cookies.get('acPerm')
      };
  }
   render() {
      return(
         <div>
            <div className="homeHeader">
               <section className="banner" >
                  <div className="container">
                     <div className="banner-inner clearfix">
                        <div className="row">
                           <div className="header" style={{width:"100%"}}>
                              <div className="logo">
                                 <Link to='/home'>
                                    <img src={Heart}/>
                                    <span>All Cures</span>
                                 </Link>     
                              </div>
                              <div className="loginSign"> 
                                 <ToggleButton acPerm={this.state.acPerm}/> 
                              </div>  
                           </div>   
                        </div>
                     </div>
                     <div className="row">
                        <div className="serchlabel">
                           <h1>Find Doctors <br/>near by your location</h1>
                        </div>
                     </div>      
                  </div>
               </section>
               <section className="megaSearch">
                  <div className="container">
                     <div className="row">
                        <div className="search-wrap-inner clearfix">
                           <form class="mainSearch" method="POST" action="/cures/SearchActionController">
                              <div className="col-md-4 pd-0 col-sx-12 col-sm-4">
                                 <div className="form-group search">
                                    <input type="text" placeholder="Doctor Name, Disease or Condition" name="doctors" id="doctors"  className="formVal form-control "/>
                                    <span className="icon-loupe"></span>
                                 </div>
                              </div>
                              <div className="col-md-4 pd-0 col-sx-12 col-sm-4">
                                 <div className="form-group city zipcode">
                                    <input type= "text" placeholder="City or Zip-code" name="city" id="city" className="formVal form-control" />
                                 </div>
                              </div>
                                 <input type="hidden" name="Latitude" id="Latitude"  className="form-control"/>
               
                                    <input type="hidden" name="Longitude" id="Longitude"  className="form-control"/>
                              <div className="col-md-4 pd-0 col-sx-12 col-sm-4">
                                 <div className="form-group date">
                                    <input type="date" name="" placeholder="Date" className="form-control"/>
                                    <button type="submit" className="btn-bg searchBtn" id="search">Search</button> 
                                 </div>
                              </div>              
                           </form>
                        </div>
                     </div>   
                  </div>
               </section>
            </div>
      <section className="tabslider clerfix">
          <div className="container">
            <div className="row">
                <div className="tab-nav">
                  <div className="comman-heading">
                     <h2>Choose by Category</h2>
                  </div>
                  {/* <!-- Nav tabs --> */}
                  <ul>
                     <li role="presentation" className="active"><a href="#Men" aria-controls="Men" role="tab" data-toggle="tab">Men</a>
                     </li>
                     <li role="presentation"><a href="#Women" aria-controls="Women" role="tab" data-toggle="tab">Women</a>
                     </li>
                     <li role="presentation"><a href="#Children" aria-controls="Children" role="tab" data-toggle="tab">Children</a>
                     </li>
                  </ul>
               </div>
                  <Carousel1/>
                  
          </div>
        </div>
      </section> 
      <section className="specialists">
         <div className="container">
            <div className="row">
               <div className="comman-heading">
                  <h2>Choose by Specialists</h2>
               </div>
            </div>
            <div className="row">
               <Carousel2/>
            </div>
         </div>
      </section>
      

      <section className="consultunt">
         <div className="container">
            <div className="row">
               <div className="consultunt-inner">
                  <h1>Meet Our Consultants Online</h1>
                  <p>Video visits can address immediate medical issues or routine healthcare needs. Doctors are ready to treat a variety of issues or help you with prescriptions or referrals.</p>
                  <div className="startVideo">
                     <a href="javascript:void(0)" className="btn-bg startVideoBtn allBtn">Start Video Consultation</a>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section className="doctor">
         <div className="container">
            <div className="row">
               <div className="comman-heading">
                  <h2>Our Top Doctors</h2>
               </div>
            </div>
            
            <div className="row">
               <Carousel2/>
            </div>
         </div>
      </section><br/><br/>
      <section className="partner">
         <div className="container">
            <div className="row">
               <div className="partnerBG">
                  <h2>Be our Partners and <br/> Expand your Client base</h2>
                  <div className="learnBtn">
                     <a href="javascript:void(0)" className="btn-bg nearmoreBtn">Learn More</a>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section className="testomonial">
         <div className="container">
            <div className="row">
               <div className="comman-heading">
                  <h2>What our patients say</h2>
               </div>
            </div>
            <div className="row">
               <CarouselReview/>
                   
            </div>
         {/* </div> */}
         </div>
      </section>
      <section className="appStore" >
         <div className="container">
            <div className="row">
               <div className="appStoreBg clearfix" style={{display:"flex",width: "100%"}}>
                  <div className="col-md-6 col-sm-6 col-sx-12">
                     <div className="innerapp">
                        <div className="doc-img">
                           <img src={Doct} alt="doct"/>
                        </div>
                        <div className="btn-Gropu">
                           <a href="javascript:void(0)" className="appBTN">App Store</a>
                           <a href="javascript:void(0)" className="appBTN">App Store</a>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-sx-12">
                     <div className="subscribe">
                        <h1>Get along with us on</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue  turpis sollicitudin nulla finibus dignissim.</p>
                        <div className="form-group relative">
                           <input type="text" name="" className="form-control"/>
                           <a href="javascript:void(0)" className="subscribeBtn">Subscribe</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <Footer/>
      </div>
      
        );
    }
}

function ToggleButton(props) {
   if(props.acPerm){
       return(
           <Link to="/dashboard" className="btn-white loginSignbtn color-blue-dark" >
               Dashboard
           </Link>
       );
   }
   return(
       <Link to="/login" className="btn-white loginSignbtn color-blue-dark" >
           Sign In/ Sign Up
       </Link>
   )
}

export default Home;
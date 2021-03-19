import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import Heart from"../../assets/img/heart.png";

import ClientA from "../../assets/img/client-a.jpg";
import ClientB from "../../assets/img/client-b.jpg";

import Doct from "../../assets/img/doct.png";

import Slider1 from "../../assets/img/slider-1.png";
import Slider2 from "../../assets/img/slider-2.png";
import Slider3 from "../../assets/img/slider-3.png";
import Slider4 from "../../assets/img/slider-4.png";
import Slider5 from "../../assets/img/slider-5.png";
import Slider6 from "../../assets/img/slider-6.png";

import Special1 from "../../assets/img/special-1.jpg";
import Special2 from "../../assets/img/special-2.jpg";
import Special3 from "../../assets/img/special-3.jpg";

class Home extends Component {
    render() {
        return(
            <div>
                {/* <Header/> */}
                <div className="homeHeader">
            <section className="banner" >
         <div className="container">
            <div className="banner-inner clearfix">
               <div className="row">
                  <div className="header">
                     <div className="logo">
                        <a href="javascript:void(0)">
                           <img src={Heart}/><span>All Cures</span></a>
                           
                           </div>
                 <div className="loginSign"> <a href="login1.jsp" className="li-modal btn-white loginSignbtn color-blue-dark " >Log in / Sign up</a> </div>
                     
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
               <div className="serch-wrap-inner clearfix">
                        <form class="mainSearch" style={{display: "block"}} method="POST" action="/cures/SearchActionController">
                     	  <div className="col-md-4 pd-0 col-sx-12 col-sm-4">
                   			<div className="form-group search">
    							<input type="text" placeholder="Doctor Name, Disease or Condition" name="doctors" id="doctors"  className="formVal form-control "/>
								<span className="icon-loupe"></span>
							</div>
						 </div>
   						 <div className="col-md-4 pd-0 col-sx-12 col-sm-4">
         				 	<div className="form-group zipcode">
    							<input type= "text" placeholder="City or Zip-code" name="city" id="city" className="formVal form-control" />
                	    	</div>
                		 </div>
         					 
              			  <input type="hidden" name="Latitude" id="Latitude"  className="form-control"/>
    	 
                       	 <input type="hidden" name="Longitude" id="Longitude"  className="form-control"/>
                         <div className="col-md-4 pd-0 col-sx-12 col-sm-4">
         					 <div className="form-group date">
                       			  <input type="date" name="" placeholder="Date" className="form-control"/>
                       			  <button style={{border: "none", padding: "1.18rem 2.2rem"}} type="submit" className="btn-bg searchBtn" id="search">Search</button> 
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
                <div className="tab-content category">
                  <div id="Men" className="tab-pane fade in active">
                    <div className="owl-carousel owl-theme">
                        <div className="item bg-pink">
                           <div className="item-img">
                              <img src={Slider1} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Cough</strong><br/> Cold</p>
                           </div>
                        </div>
                        <div className="item bg-org">
                           <div className="item-img">
                              <img src={Slider2} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Diabetes</strong><br/> Care</p>
                           </div>
                        </div>
                        <div className="item bg-l-org">
                           <div className="item-img">
                              <img src={Slider3} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Heart</strong> <br/>Care</p>
                           </div>
                        </div>
                        <div className="item bg-voilet">
                           <div className="item-img">
                              <img src={Slider4} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Dental</strong><br/> Care</p>
                           </div>
                        </div>
                        <div className="item bg-blue">
                           <div className="item-img">
                              <img src={Slider5} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Skin</strong> <br/>Care</p>
                           </div>
                        </div>
                        <div className="item bg-green">
                           <div className="item-img">
                              <img src={Slider6} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Eye</strong> <br/>Care</p>
                           </div>
                        </div>                  
                    </div>
                  </div>
            </div>
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
            <div className="owl-carousel owl-theme" id="specialists">
                 <div className="item">
                  <div className="item-img">
                     <img src={Special1} alt="special-img"/>
                  </div>
                  <div className="rating">
                    <span className="icon-star-1"></span>
                    <p>4.2</p>
                  </div>
                  <div className="sider-contain">
                     <div className="slider-heading">
                        <h2>Jordan Reich</h2>
                        <p>General Physician</p>
                        <h5>Dr. Jordan Reich, MBBS General Physician New York, NY</h5>
                     </div>
                     <a href="javascript:void(0)" className="appointmentBtn">Appointment</a>
                  </div>
                </div>
                <div className="item">
                  <div className="item-img">
                     <img src={Special2} alt="special-img"/>
                  </div>
                  <div className="rating">
                    <span className="icon-star-1"></span>
                    <p>4.2</p>
                  </div>
                  <div className="sider-contain">
                     <div className="slider-heading">
                        <h2>Jordan Reich</h2>
                        <p>General Physician</p>
                        <h5>Dr. Jordan Reich, MBBS General Physician New York, NY</h5>
                     </div>
                     <a href="javascript:void(0)" className="appointmentBtn">Appointment</a>
                  </div>
                </div>
                <div className="item">
                  <div className="item-img">
                     <img src={Special3} alt="special-img"/>
                  </div>
                  <div className="rating">
                    <span className="icon-star-1"></span>
                    <p>4.2</p>
                  </div>
                  <div className="sider-contain">
                     <div className="slider-heading">
                        <h2>Jordan Reich</h2>
                        <p>General Physician</p>
                        <h5>Dr. Jordan Reich, MBBS General Physician New York, NY</h5>
                     </div>
                     <a href="javascript:void(0)" className="appointmentBtn">Appointment</a>
                  </div>
                </div>
                <div className="item">
                  <div className="item-img">
                     <img src={Special1} alt="special-img"/>
                  </div>
                  <div className="rating">
                    <span className="icon-star-1"></span>
                    <p>4.2</p>
                  </div>
                  <div className="sider-contain">
                     <div className="slider-heading">
                        <h2>Jordan Reich</h2>
                        <p>General Physician</p>
                        <h5>Dr. Jordan Reich, MBBS General Physician New York, NY</h5>
                     </div>
                     <a href="javascript:void(0)" className="appointmentBtn">Appointment</a>
                  </div>
                </div>
            </div>
         </div>
         </div>
      </section><br/>
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
            <div className="owl-carousel owl-theme" id="doctor">
                <div className="item">
                  <div className="item-img">
                     <img src={Special2} alt="special-img"/>
                  </div>
                  <div className="rating">
                    <span className="icon-star-1"></span>
                    <p>4.2</p>
                  </div>
                  <div className="sider-contain">
                     <div className="slider-heading">
                        <h2>Jordan Reich</h2>
                        <p>General Physician</p>
                        <h5>Dr. Jordan Reich, MBBS General Physician New York, NY</h5>
                     </div>
                     <a href="javascript:void(0)" className="appointmentBtn allBtn">Appointment</a>
                  </div>
                </div>
                <div className="item">
                  <div className="item-img">
                     <img src={Special1} alt="special-img"/>
                  </div>
                  <div className="rating">
                    <span className="icon-star-1"></span>
                    <p>4.2</p>
                  </div>
                  <div className="sider-contain">
                     <div className="slider-heading">
                        <h2>Jordan Reich</h2>
                        <p>General Physician</p>
                        <h5>Dr. Jordan Reich, MBBS General Physician New York, NY</h5>
                     </div>
                     <a href="javascript:void(0)" className="appointmentBtn">Appointment</a>
                  </div>
                </div>
                <div className="item">
                  <div className="item-img">
                     <img src={Special2} alt="special-img"/>
                  </div>
                  <div className="rating">
                    <span className="icon-star-1"></span>
                    <p>4.2</p>
                  </div>
                  <div className="sider-contain">
                     <div className="slider-heading">
                        <h2>Jordan Reich</h2>
                        <p>General Physician</p>
                        <h5>Dr. Jordan Reich, MBBS General Physician New York, NY</h5>
                     </div>
                     <a href="javascript:void(0)" className="appointmentBtn">Appointment</a>
                  </div>
                </div>
                <div className="item">
                  <div className="item-img">
                     <img src={Special3} alt="special-img"/>
                  </div>
                  <div className="rating">
                    <span className="icon-star-1"></span>
                    <p>4.2</p>
                  </div>
                  <div className="sider-contain">
                     <div className="slider-heading">
                        <h2>Jordan Reich</h2>
                        <p>General Physician</p>
                        <h5>Dr. Jordan Reich, MBBS General Physician New York, NY</h5>
                     </div>
                     <a href="javascript:void(0)" className="appointmentBtn">Appointment</a>
                  </div>
                </div>
            </div>
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
               <div className="owl-carousel owl-theme" id="testomonial">
                   <div className="item">
                     <div className="testomonial-info">
                        <div className="client-img">
                           <img src={ClientA} alt="ClientA"/>
                        </div>
                        <div className="client-msg">
                           <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue turpis sollicitudin nulla finibus dignissim. Curabitur eu urna sed risus tempor venenatis. Morbi quis libero at odio elementum scelerisque at nec libero. Integer quis magna nunc. Sed malesuada efficitur tellus, a posuere risus finibus vitae.”</p>
                           <h2>Mahyar Eidgah</h2>
                           <span>New York, NY</span>
                        </div>
                     </div>
                   </div>
                   <div className="item">
                     <div className="testomonial-info">
                        <div className="client-img">
                           <img src={ClientB} alt="client-b"/>
                        </div>
                        <div className="client-msg">
                           <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue turpis sollicitudin nulla finibus dignissim. Curabitur eu urna sed risus tempor venenatis. Morbi quis libero at odio elementum scelerisque at nec libero. Integer quis magna nunc. Sed malesuada efficitur tellus, a posuere risus finibus vitae.”</p>
                           <h2>Adjoa Duker</h2>
                           <span>New York, NY</span>
                        </div>
                     </div>
                   </div>
                  <div className="item">
                     <div className="testomonial-info">
                        <div className="client-img">
                           <img src={ClientA} alt="ClientA"/>
                        </div>
                        <div className="client-msg">
                           <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue turpis sollicitudin nulla finibus dignissim. Curabitur eu urna sed risus tempor venenatis. Morbi quis libero at odio elementum scelerisque at nec libero. Integer quis magna nunc. Sed malesuada efficitur tellus, a posuere risus finibus vitae.”</p>
                           <h2>Mahyar Eidgah</h2>
                           <span>New York, NY</span>
                        </div>
                     </div>
                   </div>
                   <div className="item">
                     <div className="testomonial-info">
                        <div className="client-img">
                           <img src={ClientB} alt="client-b"/>
                        </div>
                        <div className="client-msg">
                           <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue turpis sollicitudin nulla finibus dignissim. Curabitur eu urna sed risus tempor venenatis. Morbi quis libero at odio elementum scelerisque at nec libero. Integer quis magna nunc. Sed malesuada efficitur tellus, a posuere risus finibus vitae.”</p>
                           <h2>Adjoa Duker</h2>
                           <span>New York, NY</span>
                        </div>
                     </div>
               </div>
            </div>
         </div>
         </div>
      </section>
      <section className="appStore">
         <div className="container">
            <div className="row">
               <div className="appStoreBg clearfix">
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

export default Home;
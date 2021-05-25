import React, { Component } from 'react';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import Special1 from "../../assets/img/special-1.jpg";
import Special2 from "../../assets/img/special-2.jpg";
import Special3 from "../../assets/img/special-3.jpg";

export default class Carousel2 extends Component {
    render() {
        return(
         // <div className="owl-carousel owl-theme" id="">

         <OwlCarousel navText=">>" nav="true" className="owl-theme" id="specialists" items={4} loop margin={10} >
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
   </OwlCarousel>
   // </div>
        )
    }
    
}
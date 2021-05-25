import React, { Component } from 'react';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Slider1 from "../../assets/img/slider-1.png";
import Slider2 from "../../assets/img/slider-2.png";
import Slider3 from "../../assets/img/slider-3.png";
import Slider4 from "../../assets/img/slider-4.png";
import Slider5 from "../../assets/img/slider-5.png";
import Slider6 from "../../assets/img/slider-6.png";
export default class Carousel1 extends Component {
    render() {
        return(
            <div className="tab-content category " style={{maxWidth:"1140px"}}>
                  <OwlCarousel navText="" nav=">" className="owl-theme" items={6} loop margin={150} nav>
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
                        {/* <div className="navClass">></div>  */}
      </OwlCarousel>
      </div>
        )
    }
    
}
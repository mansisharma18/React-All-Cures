import React from 'react';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Arthritis from "../../assets/img/arthritis.png";
import Slider2 from "../../assets/img/slider-2.png";
import BloodPressure from "../../assets/img/bloodpressure.png";
import Slider4 from "../../assets/img/slider-4.png";
import Thyroid from "../../assets/img/thyroid.png";
import Psoriasis from "../../assets/img/psoriasis.png";
import Slider7 from "../../assets/img/insomnia.png";
import Slider5 from "../../assets/img/slider-5.png";
import { Link } from 'react-router-dom';

const options = {
   margin: 20,
   responsiveClass: true,
   nav: true,
   dots: false,
   autoplay: false,
   smartSpeed: 1000,
   responsive: {
       0: {
           items: 1,
       },
       200: {
           items: 2,
       },
       600: {
           items: 2,
       },
       700: {
           items: 3,
       },
       1000: {
           items: 5,
       }
   },
};

export default function Carousel1(props){

        return(
            <div className="tab-content category " id="choose-category" style={{maxWidth:"1140px", zIndex: 0}}>
                  <OwlCarousel className="owl-theme owl-loading" items={6} loop margin={150}  {...options}>
                  <div className="item bg-pink">
                        <Link to={ `/searchcures/Arthritis` }>
                           <div className="item-img">
                              <img src={Arthritis} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Arthritis</strong></p>
                           </div>
                        </Link>
                        </div>
                        <div className="item bg-org">
                        <Link to={ `/searchcures/Diabetes` }>
                           <div className="item-img">
                              <img src={Slider2} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Diabetes</strong></p>
                           </div>
                           </Link>
                        </div>
                        <div className="item bg-l-org">
                        <Link to={ `/searchcures/Hypertension` }>
                           <div className="item-img">
                              <img src={BloodPressure} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Hypertension</strong></p>
                           </div>
                           </Link>
                        </div>
                        <div className="item bg-voilet">
                        <Link to={ `/searchcures/Insomnia` }>
                           <div className="item-img">
                              <img src={Slider7} alt="slider-img" />
                           </div>
                           <div className="slider-heading">
                              <p><strong>Insomnia</strong><br/></p>
                           </div>
                        </Link>
                        </div>
                        
                        <div className="item bg-blue">
                        <Link to={ `/searchcures/Thyroid` }>
                           <div className="item-img">
                              <img src={Thyroid} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Thyroid</strong></p>
                           </div>
                           </Link>
                        </div>
                        <div className="item bg-green">
                        <Link to={ `/searchcures/Psoriasis` }>
                           <div className="item-img">
                              <img src={Psoriasis} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Psoriasis</strong></p>
                           </div>
                           </Link>
                        </div> 
                        <div className="item bg-l-org">
                        <Link to={ `/searchcures/Skin Care` }>
                           <div className="item-img">
                              <img src={Slider5} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Skin</strong><br/>Care</p>
                           </div>
                        </Link>
                        </div>
                        {/* <div className="navClass">></div>  */}
      </OwlCarousel>
      </div>
        )
    
}
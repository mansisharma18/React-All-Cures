import React from 'react';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Slider1 from "../../assets/img/slider-1.png";
import Slider2 from "../../assets/img/slider-2.png";
import Slider3 from "../../assets/img/slider-3.png";
import Slider4 from "../../assets/img/slider-4.png";
import Slider5 from "../../assets/img/slider-5.png";
import Slider6 from "../../assets/img/slider-6.png";
import Slider7 from "../../assets/img/slider-7.png";
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
                        <Link to={ `/cures/Cough And Cold` }>
                           <div className="item-img">
                              <img src={Slider1} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Cough</strong><br/> Cold</p>
                           </div>
                        </Link>
                        </div>
                        <div className="item bg-org">
                        <Link to={ `/cures/Diabetes` }>
                           <div className="item-img">
                              <img src={Slider2} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Diabetes</strong><br/> Care</p>
                           </div>
                           </Link>
                        </div>
                        <div className="item bg-l-org">
                        <Link to={ `/cures/Cardiology` }>
                           <div className="item-img">
                              <img src={Slider3} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Heart</strong> <br/>Care</p>
                           </div>
                           </Link>
                        </div>
                        <div className="item bg-voilet">
                        <Link to={ `/cures/Insomnia` }>
                           <div className="item-img">
                              <img src={Slider7} alt="slider-img" className='pb-4'/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Insomnia</strong><br/></p>
                           </div>
                        </Link>
                        </div>
                        
                        <div className="item bg-blue">
                        <Link to={ `/cures/Dermatology` }>
                           <div className="item-img">
                              <img src={Slider5} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Skin</strong> <br/>Care</p>
                           </div>
                           </Link>
                        </div>
                        <div className="item bg-green">
                        <Link to={ `/cures/ENT` }>
                           <div className="item-img">
                              <img src={Slider6} alt="slider-img"/>
                           </div>
                           <div className="slider-heading">
                              <p><strong>Eye</strong> <br/>Care</p>
                           </div>
                           </Link>
                        </div> 
                        {/* <div className="navClass">></div>  */}
      </OwlCarousel>
      </div>
        )
    
}
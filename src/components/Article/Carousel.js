import {Component} from 'react'
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default class Carousel extends Component {
     
     render() {
         return(
             <div id="article-carousel">
          <OwlCarousel nav="true" className="owl-theme" id="specialists" items={4} margin={10}>
             <div className="item">
                <div className="item-img">
                   <i className="fas fa-user-md fa-10x"></i>
                </div>
             </div>
                         
    </OwlCarousel>
    </div>
         );
       
     }
     
 }
import React, { Component } from 'react';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import ClientA from "../../assets/img/client-a.jpg";
import ClientB from "../../assets/img/client-b.jpg";


const options = {
   margin: 30,
   responsiveClass: true,
   nav: true,
   dots: true,
   autoplay: false,
   smartSpeed: 1000,
   responsive: {
       0: {
           items: 1,
       },
       400: {
           items: 1,
       },
       600: {
           items: 1,
       },
       700: {
           items: 2,
       },
       1000: {
           items: 2,

       }
   },
};

export default class CarouselReview extends Component {
    render() {
        return(
                <OwlCarousel navText=">>" nav="true" className="owl-theme" items={2} loop="true" margin={10} {...options}>
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
                </OwlCarousel>
        )
    }
    
}
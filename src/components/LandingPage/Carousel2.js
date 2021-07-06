import React, { Component } from 'react';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from 'react-router-dom';
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core"
// import carouselItem from './carouselItem'
const options = {
   navText: ["Prev", ">"],
   dots: true
   
};
export default class Carousel2 extends Component {
   constructor(props){
      super(props);
      this.state = {
        items: [],
        isLoaded: false,
        responsive:{
         0: {
             items: 1,
         },
         370: {
             items: 2,
         },
     },
      }
    }

   componentDidMount(){
      fetch(`/SearchActionController?cmd=getResults&city=jammu&doctors=&Latitude=&Longitude=`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            isLoaded: true,
            items: json.map.DoctorDetails.myArrayList,
          })            
        });
    }
    
    render() {
      var { isLoaded,items } = this.state;
      if(!isLoaded) {
        return <div>Loading...</div>;
      }
      else if(isLoaded){
        return(
         <OwlCarousel {...options} nav="true" className="owl-theme" id="specialists" items={4} margin={10}>
         {items.map((i) => (
            <div className="item">
               <div className="item-img">
                  {/* <img src={Special2} alt="special-img"/> */}
                  <i className="fas fa-user-md fa-10x"></i>

               </div>
               <div className="rating">
                  <span className="icon-star-1"></span>
                  <p>4.2</p>
               </div>
               <div className="sider-contain">
                  <div className="slider-heading">
                     <h2>Dr. {i.map.docname_first} {i.map.docname_last}</h2>
                     <p>{i.map.primary_spl}</p>
                     <h5 className="text-center">{i.map.hospital_affliated} {i.map.state} {i.map.country_code}</h5>
                  </div>
                  <Link to="#" className="appointmentBtn allBtn">Appointment</Link>
               </div>
            </div>
         ))}
                        
   </OwlCarousel>
        );
      }
    }
    
}
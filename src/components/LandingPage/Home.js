import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Heart from"../../assets/img/heart.png";
import Doct from "../../assets/img/doct.png";
import axios from 'axios';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import '../../assets/healthcare/css/main.css';
import '../../assets/healthcare/css/responsive.css';
import '../../assets/healthcare/css/animate.css';
import '../../assets/healthcare/icomoon/style.css';
import './custom.css';
import Carousel1 from './Caousel1';
import Carousel2 from './Carousel2';
import CarouselReview from './CarouselReview';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import ToggleButton from '../Header/Header'

class Home extends Component {
   constructor(props){
      super(props);
      this.state = {
         users: '',
         texts: '',
         suggestions: [],
         suggestionsDoc: [],
         doctor : '',
         getPincode:null,
         getCityName:null,
         docname : '',
          acPerm: Cookies.get('acPerm'),
          searchParams: {
            city: '',
            Pincode: '',
            name: '',
        }
      };
  }

 componentWillMount(){
   const loadUsers = async () => {
      const response = await axios.get('/city/all');
      this.setState ({
         users: response.data
      })
    }
    loadUsers();

   const loaddoctor = async () => {
      const response = await axios.get('/IntegratedActionController')
      this.setState ({
         doctor: response.data
      })
    }
    loaddoctor();
 }

  onSuggestHandler = (text, ano) => {
    if(Number.isInteger(this.state.getPincode)) {
      this.state.searchParams.city = ano;
    }else{
      this.state.searchParams.city = text;
    }
    
   //  this.state.Pincode.city = text;
     this.setState({
        suggestions: []
     });
 }

 onChangeHandler = (e, text) => {

   const testVal = parseInt(e.target.value)   

   let matches = []
   if (text.length > 0) {
     matches = this.state.users.filter(user => {
       const regex = new RegExp(`${text}`, "gi");
       return user.Cityname.match(regex)
     })
   }
   if (Number.isInteger(testVal)) {
      matches = this.state.users.filter(user => {
      //   const regex = new RegExp(`${testVal}`, "gi");
        return user.Pincode.match(testVal)
      })
    }
   this.setState({
      texts: text,
      suggestions: matches,
      searchParams: { ...this.state.searchParams, [e.target.name]: text }

   });
 }

 onSuggestHandlerdoctor = (text) => {
    
   this.state.searchParams.name= text;
   this.setState({
      suggestionsDoc: []
   });
}
onChangeHandlerdoctor = (e, text) => {
 let matches = []
 if (text.length > 0) {
   matches = this.state.doctor.map.Doctorname.myArrayList.filter(user => {
     const regex = new RegExp(`${text}`, "gi");
     return user.match(regex)
   })
 }
 this.setState({
    texts: text,
    suggestionsDoc: matches,
    searchParams: { ...this.state.searchParams, [e.target.name]: text }

 });
}
  handleChange = e => 
        this.setState({
            searchParams: { ...this.state.searchParams, [e.target.name]: e.target.value }
        });

   
   logout = async e => {
      const res = await fetch("/LogoutActionController", {
         method: "POST"
      });
        const data = await res.text();
        setTimeout(() => {
           window.location.reload()
        }, 1000);
   }


   render() {
      console.log(this.state.suggestions)
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
                                    <img src={Heart} alt="All Cures logo"/>
                                    <span>All Cures</span>
                                 </Link>     
                              </div>
                              <div className="loginSign"> 
                              {/* <Link to="/profile">Go to Profile</Link> */}
                              
                                 <ToggleButton acPerm={this.state.acPerm} match={this.props.match.url} logout={this.logout}/> 
                                 {/* <button onClick={this.logout}></button> */}
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
                           <form className="mainSearch">
                              <div className="col-md-4 pd-0 col-sx-12 col-sm-4">
                                 <div className="form-group search">
                                 <input type="text" placeholder="Doctor Name, Disease or Condition" name="name" id="doctors" 
                                 autoComplete="off"
                                 onChange={e => this.onChangeHandlerdoctor(e, e.target.value)} 
                                 value={this.state.searchParams.name} 
                                 className="formVal form-control "/>
                                    <div className="suggest">
                                       {this.state.suggestionsDoc.map((item,index)=>{
                                          return  <div key={index} className="col-md-12 justify-content-md-center  suggestionSearch"
                                          onClick={() => this.onSuggestHandlerdoctor(item)}
                                       >{item}</div>
                                       })}
                                    </div>
                                 </div>
                              </div>
                              <div className="col-md-4 pd-0 col-sx-12 col-sm-4">
                                 <div className="form-group city zipcode">
                                 <input type= "text" placeholder="City or Zip-code" name="city" id="city"
                                 autoComplete="off" 
                                 onChange={e => {
                                    this.onChangeHandler(e, e.target.value)
                                    if(e.target.value){
                                       this.setState({
                                          getPincode: parseInt(e.target.value)
                                       })
                                    }else {
                                       this.setState({
                                          getCityName: String(e.target.value)
                                       })
                                    }
                                    
                                 }} 
                                 value={this.state.searchParams.city} 
                                 className="formVal form-control"
                                 />
                                 { this.state.suggestions.map((suggestion, i) =>
                                    <div key={i} className="suggestion col-md-12 justify-content-md-center"
                                       onClick={() => this.onSuggestHandler(suggestion.Cityname,suggestion.Pincode)}
                                    >
                                       {Number.isInteger(this.state.getPincode) ? suggestion.Pincode :  suggestion.Cityname}

                                    </div>
                                 )}
                                 </div>
                              </div>
                                 <input type="hidden" name="Latitude" id="Latitude"  className="form-control"/>
               
                                    <input type="hidden" name="Longitude" id="Longitude"  className="form-control"/>
                              <div className="col-md-4 pd-0 col-sx-12 col-sm-4">
                                 <div className="form-group date">
                                    <input type="text" name="" placeholder="Date" className="form-control" onFocus={(e) => e.target.type = 'date'}/>
                                    {
                                       this.state.searchParams.name
                                       ? <Link type="
                                       submit" 
                                       className="btn-bg searchBtn" 
                                       id="search"
                                       to={ `/search/${this.state.searchParams.name}`}
                                       >Search</Link>
                                       : <Link type="
                                       submit" 
                                       className="btn-bg searchBtn" 
                                       id="search"
                                       to={ `/search/${this.state.searchParams.city}/${this.state.searchParams.name}`}
                                       >Search</Link> 

                                    }
                                    <Link 
                                     type="
                                     submit" 
                                     className="btn-bg searchBtn" 
                                     id="search"
                                     to={
                                       this.state.searchParams.name
                                       ?  `/searchName/${this.state.searchParams.name}`
                                       :`/search/${this.state.searchParams.city}/${this.state.searchParams.name}`
                                    }>Search</Link>
                                    
                                    {/* //  { `/search/${this.state.searchParams.city}/${this.state.searchParams.name}`}
                                    //  >Search</Link>   */}
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
                  <Carousel1 city={this.state.searchParams.city}/>
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
                     <Link to="#" className="btn-bg startVideoBtn allBtn">Start Video Consultation</Link>
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
                     <Link href="/#" className="btn-bg nearmoreBtn">Learn More</Link>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section className="testomonial" id="testimonials">
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
               <div className="appStoreBg clearfix" style={{display:"flex",width: "100%",flexWrap: 'wrap'}}>
                  <div className="col-md-6 col-sm-6 col-sx-12">
                     <div className="innerapp">
                        <div className="doc-img">
                           <img src={Doct} alt="doct"/>
                        </div>
                        <div className="btn-Gropu">
                           <a href="/#" className="appBTN">App Store</a>
                           <a href="/#" className="appBTN">App Store</a>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-sx-12">
                     <div className="subscribe">
                        <h1>Get along with us on</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue  turpis sollicitudin nulla finibus dignissim.</p>
                        <div className="form-group relative">
                           <div className="aaa">
                              <input type="text" name="" className="form-control"/>
                           </div>
                           <div>
                              <a href="/#" className="subscribeBtn">Subscribe</a>
                           </div>
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
         <li className="dropdown">
         <a className="dropdown-toggle" data-toggle="dropdown" href="#">
             <i className="fa fa-user fa-2x"></i> 
         </a>
         <ul className="dropdown-menu dropdown-user">
             <li><a href="/dashboard" className="dropdown-item">Dashboard</a>
             </li>
             <li className="divider"></li>
             <li><a onClick={props.logout} className="dropdown-item"> Logout</a>
             </li>
         </ul>
       </li>  
         // <DropdownButton style={{background: 'white'}} title="Welcome !">
         //    <Dropdown.Item >
         //    <Link to="/dashboard">
         //       Dashboard
         //   </Link>
         //    </Dropdown.Item>
         //    <Dropdown.Item onClick={props.logout}>Logout</Dropdown.Item>
         // </DropdownButton>
           
       );
   }
   return(
      <Link 
         className="btn-white loginSignbtn color-blue-dark" 
         to={{pathname: props.match, search: '?login=true', state: {open: true}}}
      >
         Sign in/Sign up
      </Link>

      //  <Link to="/login" className="btn-white loginSignbtn color-blue-dark" >
      //      Sign In/ Sign Up
      //  </Link>
   )
}

export default Home;
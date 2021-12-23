import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Heart from"../../assets/img/heart.png";
import Doct from "../../assets/img/doct.png";
import axios from 'axios';
import '../../assets/healthcare/css/main.css';
import '../../assets/healthcare/css/responsive.css';
import '../../assets/healthcare/css/animate.css';
import '../../assets/healthcare/icomoon/style.css';
import './custom.css';
import Carousel1 from './Caousel1';
import Carousel2 from './Carousel2';
// import CarouselReview from './CarouselReview';
import { Dropdown, Alert } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './Home.css'

// ICONS
import Account from '../../assets/icon/icons-AllCures/account_circle_black_48dp.svg'
import CreateCures from '../../assets/icon/icons-AllCures/edit_black_48dp.svg'
import List from '../../assets/icon/icons-AllCures/list_black_48dp.svg'

import { backendHost } from '../../api-config';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Test from './test'
import { env } from 'process';
import { userId } from '../UserId'
import { userAccess } from '../UserAccess'
import ArticlePreview from './ArticlePreview'
import TrendingArticles from './TrendingArticles';
env.REACT_APP = 'http://117.241.171.115:8080/cures';

class Home extends Component {
   constructor(props){
      super(props);
      const params = props.match.params
      this.state = {
         afterSubmitLoad: false,
         showAlert: false,
         alertMsg: '',
         articleFilter: '',
         article: '',
         users: [],
         city: '',
         name: '',
         value:'',
         texts: '',
         cityList: [],
         pinList: [],
         suggestions: [],
         suggestionsDoc: [],
         doctor : [],
         diseaseTitle: [],
         mobile: '',
         getPincode:null,
         getCityName:null,
         edit: false,
         doctorLoaded: false,
         modalShow: this.props.location.state? this.props.location.state.modalShow: false,
         path: this.props.location.state? this.props.location.state.path: '',
         show: false,
         docname : '',
         spec1: [],
         param: params,
         cures:[],
         disease:[],
   
          acPerm: Cookies.get('acPerm'),
          searchParams: {
            city: '',
            Pincode: '',
            name: '',
            subscription: '',
           
          
        }
        
    };      
  }
 

 componentDidMount(){
    if(userId){
       this.setState({modalShow: false})
    }
   const loadUsers = async () => {
      await axios.get(`${backendHost}/city/all`)
      .then(res => {
         this.setState ({
            users: res.data
         })
         this.state.users.map((u) => (
            this.state.cityList.push(u.Cityname, u.Pincode)
         ))
      })
      .catch(res => console.log(res))
    }
    loadUsers();

   const loaddoctor = async () => {
      await axios.get(`${backendHost}/IntegratedActionController`)
      .then(res => {
         this.setState ({
            doctor: res.data,
            doctorLoaded: true
         })
      })
      .catch(res =>  console.log(res))
    }
    loaddoctor();

    Promise.all([
      fetch(`${backendHost}/article/all/table/disease_condition`)
      .then(res => res.json()),
    ]).then(([diseaseData]) => {
      this.setState({
          isLoaded: true,
          speciality: diseaseData,
      });

    }).then(() => {
      this.state.speciality.map((i) => (
        this.state.spec1.push(i[3])
      ))
    })
    .catch(res => {
       console.error(res)
    })
 }

 componentDidUpdate(prevProps, prevState){
   if(prevState.article !== this.state.article && this.state.article){
      axios.get(`${backendHost}/isearch/combo/${this.state.article}`)
      .then(res => {
         this.setState({
            diseaseTitle: res.data
         })
      })
   }
 }

 diseasePosts(){                     // For specific cures like "/cures/diabetes"
   fetch(`${backendHost}/isearch/${this.state.param.type}`)
     .then((res) => res.json())
     .then((json) => {
       this.setState({
         isLoaded: true,
         items: json,
       });
     })
     .catch(err => 
      console.log(err)
  )
 }
   
 postSubscribtion() {
   //  var mobileNumber = this.state.mobile.split('+')
   console.log('value: ', this.state.value)
   var phoneNumber = this.state.value.split('+')[1]
   console.log(phoneNumber)
   var countryCodeLength = phoneNumber.length % 10
    console.log('Country COde:', countryCodeLength)
   var countryCode = phoneNumber.slice(0, countryCodeLength)
   console.log(countryCode)
   var StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, '')
   console.log(StringValue)
    if(phoneNumber){
      this.setState({
         afterSubmitLoad: true
      })
     axios.post(`${backendHost}/users/subscribe/${StringValue}`, {
     "nl_subscription_disease_id": this.state.disease.join(','),
     "nl_sub_type":1,
     "nl_subscription_cures_id":this.state.cures.join(','),
     "country_code": countryCode,
     })
       .then(res => {
        this.setState({
           afterSubmitLoad: false
        })
        if(res.data === 1){
           this.Alert('You have successfully subscribed to our Newsletter')
        }
        else {
           this.Alert('Some error occured! Please try again later.')
        }
       })
       .catch(err => {
        this.setState({
           afterSubmitLoad: false
        })
        this.Alert('Some error occured! Please try again later.')
        
  
     })
    } else {
       this.Alert('Please enter a valid number!')
    }
 }

  handleChange = e => 
        this.setState({
            searchParams: { ...this.state.searchParams, [e.target.name]: e.target.value }
        });

   logout = async e => {
      await fetch(`${backendHost}/LogoutActionController`, {
         method: "POST"
      }).then(res => {
         // if(res.data === '/cures/Login.html?msg=You have successfully logged out.'){
            Cookies.remove('uName')
            setTimeout(() => {
               window.location.reload()
            }, 500);
         // }
      }).catch(res => {
         console.log('Not able to logout')
      })
   }

  

   Alert = (msg) => {
      this.setState({
         showAlert:true,
         alertMsg: msg
      })
      setTimeout(() => {
         this.setState({
            showAlert: false
         })
      }, 5000);
    }
   setModalShow =(action) => {
      this.setState({
        modalShow: action
      })
    }
    setMobile= e => {
       this.setState({
         mobile: e.target.value
       })
    }
    setCountryCode= e => {
       this.setState({
         mobile: e.target.value
       })
    }

   onSearch = (e) => {
      var { city, name } = this.state
      e.preventDefault()
      if(city && name){
         this.props.history.push(`/search/${city}/${name}`)
      } else if(city){
         this.props.history.push(`/search/${city}`)
      } else if(name) {
         this.props.history.push(`/searchName/${name}`)
      }
   }

   articleSearch = (e) => {
      e.preventDefault()
      if(this.state.article){
         this.props.history.push(`/searchcures/${this.state.article}`)
      } else {
         this.props.history.push(`/searchcures`)
      }
   }
   
   render() {
      return(
         <div>
            {
                this.state.afterSubmitLoad &&
                <div className="loader main on-submit-loading">
                    <i className="fa fa-spinner fa-spin fa-10x" />
                </div>
            }
            {
                this.state.showAlert &&
                    <div className="alert alert-success pop-up border-bottom">
                        <div className="h5 mb-0 text-center">{this.state.alertMsg}</div>
                        <div className="timer"></div>
                    </div>
            }
            <div className="homeHeader my-3">
                  <div className='container d-flex justify-content-between'>

                  {/* LOGO */}

                  <div className="logo mt-2">
                     <Link to='/home'>
                        <img src={Heart} alt="All Cures logo"/>
                        <span>All Cures</span>
                     </Link>               
                  </div>

                  {/* Search for Cures */}

                  <form onSubmit={(e) => this.articleSearch(e)} className="article-search" id="article-search">
                     <div className="col-md-12 row">
                        <div className="col-md-10 p-0">    
                           <Autocomplete className="bg-white color-black" freeSolo
                              value={this.state.article}
                              onChange={(event, newValue) => {
                                 this.setState({
                                    article: newValue
                                 })
                              }}
                              inputValue={this.state.article ? this.state.article : ''}
                              onInputChange={(event, newInputValue) => {
                                 this.setState({
                                    article: newInputValue
                                 })
                              }}
                              id="combo-box-demo"
                              options={
                                 this.state.article?
                                    this.state.article.length >=1 ? 
                                    this.state.diseaseTitle 
                                    : [] 
                                 : []
                              }
                              sx={{ width: 300 }}
                              
                              renderInput={(params) => <TextField {...params} label="Search Cures" />}
                           />
                        </div>
                        <div className="col-md-2 p-0 mainBtn">
                           <button className="btn btn-article-search color-white search-main-btns" id="mainSearch" type="submit">
                              <i className="fas fa-search"></i>
                           </button>
                        </div>
                     </div>
                  </form>

                  {/* Create Cures, Sign Up || Hi ${name} Button */}

                  <div className="loginSign mt-1"> 
                     {/* {
                        this.state.acPerm? */}
                           <Link className="btn mr-1 primary-btn-color
                            loginSignbtn color-blue-dark" to="/article">
                              <img src={CreateCures} className='filter-white' height="30px"/>
                           </Link>
                        {/* : <button className="btn mr-1 primary-btn-color
                         loginSignbtn color-blue-dark" onClick={() => this.setModalShow(true)}>
                             <img src={CreateCures} className='filter-white' height="30px"/>
                           </button>
                     }    */}
                  
                  {/* Toggle Sign up & Hi there dropdown */}

                  <ToggleButton userName={Cookies.get('uName')} setModalShow={this.setModalShow} acPerm={this.state.acPerm} match={this.props.match.url} logout={this.logout}/> 
               </div>  
            </div>

               {/* </section> */}
            </div>
               <section className="banner">
                  <div className='banner-title h1 d-flex justify-content-center align-items-center'>
                     <h1 className='color-white font-weight-bold 'id="head1">All Cures</h1>
                     <div className='h2 color-white text-center' id="head1">Getting You Closer To Cures From Around The World</div>
                  </div>
               </section>
               
               <section className="megaSearch">
                  
                  <div className="container">
                  
                     <div className="row">
                     <Test
                        show={this.state.modalShow}
                        path={this.state.path}
                        onHide={() => this.setModalShow(false)}
                     />
                        <div className="search-wrap-inner clearfix">
                        <form onSubmit={(e) => this.onSearch(e)} className="mainSearch" >
                     	  {/* <div className="col-md-6 pd-0 col-sx-12 col-sm-4">
                   			<div className="form-group search"> */}
                            <div className="col-md-12 p-0">
                            <div className="row">
                            <div className="doc-name col-md-6 col-sm-12"id="homeDoc">
                            <Autocomplete className="bg-white color-black"
                              freeSolo
                              value={this.state.name}
                              onChange={(event, newValue) => {
                                 this.setState({
                                    name: newValue
                                 })
                              }}
                              inputValue={this.state.name ? this.state.name : ''}
                              onInputChange={(event, newInputValue) => {
                                 this.setState({
                                    name: newInputValue
                                 })
                              }}
                              id="combo-box-demo"
                              options={
                                 this.state.doctorLoaded ?
                                    this.state.name?
                                    this.state.name.length >= 1? 
                                       this.state.doctor.map.Doctorname.myArrayList
                                       : []
                                    : []
                                    :[]
                              }
                              renderInput={(params) => <TextField {...params} label="Search Doctors (Name)" />}
                           />
                            </div>
                            
                                 {/* </div>
                              </div> */}
                              {/* <div className="col-md-5 pd-0 col-sx-12 col-sm-4">
                                 <div className="form-group city zipcode"> */}
                                 <div className="city-name col-md-5" id="homeCity">
                                 <Autocomplete className="bg-white p-0 color-black"
                              freeSolo
                              value={this.state.city}
                              onChange={(event, newValue) => {
                                 this.setState({
                                    city: newValue
                                 })
                              }}
                              inputValue={this.state.city ? this.state.city : ''}
                              onInputChange={(event, newInputValue) => {
                                 this.setState({
                                    city: newInputValue
                                 })
                              }}
                              id="combo-box-demo"
                              options={this.state.city?
                                 this.state.city.length >= 1?
                                 this.state.cityList 
                                 : []
                                 :[]
                              }
                              renderInput={(params) => <TextField {...params} label="Search Doctors (City or Pin)" />}
                           />
                                 </div>
                                 
                                 <div className="mainBtn col-md-1">
                           <button type="submit" className=" btn btn-article-search color-white float-right" id="btnDoc">
                                 <i className="fas fa-search"></i>
                              </button>
                              </div>
                              </div>
                              </div>
              			  <input type="hidden" name="Latitude" id="Latitude"  className="form-control"/>
    	 
                       	 <input type="hidden" name="Longitude" id="Longitude"  className="form-control"/>
                       	                                                 
                        </form>
                        </div>
                     </div>   
                  </div>
               </section>
      <section className="tabslider clerfix">
          <div className="container">
            <div className="row">
                <div className="tab-nav">
                  <div className="comman-heading">
                     <div className="h4 mt-4">Choose by Category</div>
                  </div>
                  {/* <!-- Nav tabs --> */}
                  {/* <ul>
                     <li role="presentation" className="active"><a href="#Men" aria-controls="Men" role="tab" data-toggle="tab">Men</a>
                     </li>
                     <li role="presentation"><a href="#Women" aria-controls="Women" role="tab" data-toggle="tab">Women</a>
                     </li>
                     <li role="presentation"><a href="#Children" aria-controls="Children" role="tab" data-toggle="tab">Children</a>
                     </li>
                     
                     
                  </ul> */}
               </div>
                  <Carousel1 city={this.state.searchParams.city}/>
          </div>
        </div>
      </section> 




      <section className="mb-5 mt-2">
      <div className="container">
            <div className="row">
               <div className="comman-heading">
                  <div className="h4">Trending Cures</div>
               </div>
            </div>
            <div className="row">
         <TrendingArticles/>
         </div>
           
         </div>
      </section>




      <section className="trending-section">
      
         <ArticlePreview articleFilter = {this.state.articleFilter}/>
         
      </section>

      

      <section className="specialists mt-3">
         <div className="container">
            <div className="row">
               <div className="comman-heading">
               <div className="h4 mt-4">Choose by Specialists</div>
               </div>
            </div>
            <div className="row">
            <div className='nav-btn prev-slide'></div><div className='nav-btn next-slide'></div>
               <Carousel2/>
            </div>
           
         </div>
      </section>
      

      {/* <section className="consultunt">
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
      </section> */}
      {/* <section className="doctor">
         <div className="container">
            <div className="row">
               <div className="comman-heading">
               <div className="h4">Our Top Doctors</div>
               </div>
            </div>
            
            <div className="row">
               <Carousel2/>
            </div>
        
         </div>
         
      </section><br/><br/> */}
      {/* <section className="partner">
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
      </section> */}
      {/* <section className="testomonial" id="testimonials">
         <div className="container">
            <div className="row">
               <div className="comman-heading">
                  <h2>What our patients say</h2>
               </div>
            </div>
            <div className="row">
               <CarouselReview/>
                   
            </div> 
       
         </div>
      </section> */}
      <div>
         
         <button id="mobile-subscribe-fixed-btn" className="btn newsletter-icon rounded subscribe-btn newsletter_float" data-toggle="modal"data-target=".bd-example-modal-lg">
      Subscribe
     
            </button>
           
         </div>
<div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
    <div className="modal-header">
        
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    <section className="appStore" >
         <div className="container">
            <div className="row">
               <div className="appStoreBg clearfix" style={{display:"flex",width: "100%",flexWrap: 'wrap'}}>
                  <div className="col-md-6 col-sm-6 col-sx-12">
                     <div className="innerapp">
                        <div className="doc-img">
                           <img src={Doct} alt="doct"/>
                        </div>
                       
                     </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-sx-12 bg-white subs-hero-2">
                     <div className="subscribe">                    
                        <h1 className="text-dark">All Cures</h1>
                        <div className="h5">Sign up for our free <span>All Cures</span> Daily Newsletter</div><br/>
                        <div className="h5">Get <span>doctor-approved</span> health tips, news, and more</div>
                        <div className="form-group relative">
                           <div className="aaa">
                              <PhoneInput
                                 placeholder="Enter phone number"
                                 value={this.state.value}
                                 defaultCountry='IN'
                              
                                 onChange={(newValue) => {
                                    this.setState({
                                       value: newValue
                                    })
                                 }}
                              />                              
                           </div>
                           <div>
                              <button className="bcolor rounded py-2" onClick={( ) => {this.postSubscribtion()}}>
                                 Submit
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
        
      </section>
    </div>
  </div>
</div>
      <Footer/>
      </div>
      
        );
    }
}

function ToggleButton(props) {
   if(props.acPerm){
       return(
         <>
         <Dropdown>
           <Dropdown.Toggle  className="header-drop text-capitalize" id="drop-down">
            <img className='filter-white mr-1' src={List} height="30px" />
           <img className='filter-white' src={Account} height="30px" />
           </Dropdown.Toggle>
           <Dropdown.Menu>
             <Dropdown.Item>
             <Link  className="text-dark btn" to={`/user/profile`}>
                               Profile
                      </Link>
             </Dropdown.Item>
             { props.acPerm.split('|')[1] >= 4?
               <Dropdown.Item >
               <Link to="/dashboard" className="text-dark btn">
                  Dashboard</Link>
               </Dropdown.Item>
               :  <Dropdown.Item >
               <Link to="/my-cures" className="text-dark btn">
                  My Cures</Link>
               </Dropdown.Item>
            }
             
             <Dropdown.Item >
             <button className="btn text-dark text-capitalize" onClick={props.logout}> Logout</button>
             </Dropdown.Item>
           </Dropdown.Menu>
         </Dropdown>
       </>
          );
   }
   return(
      <>
      <button 
         className="btn primary-btn-color text-light loginSignbtn color-blue-darks" 
       
         variant="dark" 
         style={{width: '10rem'}}
         onClick={() => props.setModalShow(true)}
      >
            Sign in/Sign up
      </button>
      {/* <Link 
         className="btn-white loginSignbtn color-blue-dark" 
         to={{pathname: props.match, search: '?login=true', state: {open: true}}}
      >
         Sign in/Sign up
      </Link> */}
      </>
   )
}

export default Home;
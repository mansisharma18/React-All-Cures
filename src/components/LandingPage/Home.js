import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Heart from"../../assets/img/heart.png";
import Doct from "../../assets/img/doct.png";
import axios from 'axios';
import ListItem from '@material-ui/core/ListItem';
import '../../assets/healthcare/css/main.css';
import '../../assets/healthcare/css/responsive.css';
import '../../assets/healthcare/css/animate.css';
import '../../assets/healthcare/icomoon/style.css';
import './custom.css';
import Carousel1 from './Caousel1';
import Carousel2 from './Carousel2';
import CarouselReview from './CarouselReview';
import { Dropdown, Button, DropdownButton, Nav, Modal, Alert} from 'react-bootstrap';
// import Autocomplete from '../Autocomplete'
import { backendHost } from '../../api-config';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import ToggleButton from '../Header/Header'
import Test from './test'
import { env } from 'process';
import { ThreeSixtyOutlined } from '@material-ui/icons';

env.REACT_APP = 'http://117.241.171.115:8080/cures';
console.log('ukaygduayn87ncwyc8qy: ',env.REACT_APP);

class Home extends Component {
   constructor(props){
      super(props);
      console.log(props)
      const params = props.match.params
      this.state = {
         users: [],
         city: '',
         name: '',
         texts: '',
         cityList: [],
         pinList: [],
         suggestions: [],
         suggestionsDoc: [],
         doctor : [],
         mobile: '',
         getPincode:null,
         getCityName:null,
         edit: false,
         doctorLoaded: false,
      modalShow: false,
      show: false,
         docname : '',
         spec1: [],
         param: params,
   
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
   const loadUsers = async () => {
      await axios.get(`${backendHost}/city/all`)
      .then(res => {
         this.setState ({
            users: res.data
         })
         this.state.users.map((u) => {
            this.state.cityList.push(u.Cityname, u.Pincode)
         })
         // this.state.users.map((u) => {
         //    this.state.pinList.push(u.Pincode)
         // })
         // console.log('CIty & pincode: ', this.state.pinList)
         console.log('CIty list: ', this.state.cityList)
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
         console.log('dkihukhdskuhdkushdudhsdkh: ',this.state.doctor.map.Doctorname.myArrayList)
      })
      .catch(res =>  console.log(res))
    }
    loaddoctor();
 }

 diseasePosts(){                     // For specific blogs like "/blogs/diabetes"
   fetch(`${backendHost}/isearch/${this.state.param.type}`)
     .then((res) => res.json())
     .then((json) => {
       console.log(json);
       this.setState({
         isLoaded: true,
         items: json,
       });
     });
 }
   
 postSubscribtion() {
   // console.log(selected.join())
   // console.log(rejected.join())
   
   axios.post(`${backendHost}/users/subscribe/${this.state.mobile}`, {
   //   "articles_ids": selected.join(),
   //   "articles_ids_rejected": rejected.join()

   "nl_subscription_disease_id": 1,
   "nl_sub_type":1,
   "nl_subscription_cures_id":0,
   })
     .then(res => {
       console.log(res)
       this.setState({ShowSubmitAlert: true});
       window.location.reload(true);
      
     })
     .catch(err => {
        console.log(err)
        this.setState({ShowErrorAlert: true});
        setTimeout(()=>{
        this.setState({ShowErrorAlert: false});
        },4000)

   })

   
 }

  handleChange = e => 
        this.setState({
            searchParams: { ...this.state.searchParams, [e.target.name]: e.target.value }
        });

        componentWillMount(){
         Promise.all([
            fetch(`${backendHost}/article/all/table/disease_condition`)
            .then(res => res.json()),
          ]).then(([diseaseData]) => {
            console.log('Speciality Data: ', diseaseData)
            this.setState({
                isLoaded: true,
                speciality: diseaseData,
            });

          }).then(() => {
            this.state.speciality.map((i) => {
              this.state.spec1.push(i[3])
            })
          })
          .catch(res => {
             console.error(res)
          })
         }
   logout = async e => {
      const res = await fetch(`${backendHost}/LogoutActionController`, {
         method: "POST"
      });
        const data = await res.text();
        setTimeout(() => {
           window.location.reload()
        }, 1000);
   }

   setModalShow =(action) => {
      this.setState({
        modalShow: action
      })
    }
    setMobile= e => {
       
       console.log(e.target.value)
       this.setState({
         mobile: e.target.value
       })
    }

   onSearch = (e) => {
      var { city, name } = this.state
      e.preventDefault()
      console.log(city, name)
      if(city && name){
         window.location.href = `/search/${city}/${name}`
         console.log('city && name')
      } else if(city){
         window.location.href = `/search/${city}`
         console.log('only city')
      } else if(name) {
         window.location.href = `/searchName/${name}`
         console.log('only name')
      }
   }

   articleSearch = (e) => {
      e.preventDefault()
      if(this.state.article){
         window.location.href = `/blogs/${this.state.article}`
      } else {
         window.location.href = `/blogs`
      }
   }
   
   render() {
      console.log(this.state.suggestions)
      // console.log(process.env)
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
                           {
                              this.state.acPerm?
                              <Link className="btn border mr-2 btn-white loginSignbtn color-blue-dark"  to="/article">
                              Create Article
                            </Link>
                              : null
                           }   
      
                                 <ToggleButton userName={Cookies.get('uName')} setModalShow={this.setModalShow} acPerm={this.state.acPerm} match={this.props.match.url} logout={this.logout}/> 
                                 {/* <button onClick={this.logout}></button> */}
                              </div>  
                           </div>   
                        </div>
                     </div>
                     <div className="row">
                        <div className="serchlabel">
                           <h1>Find Doctors <br/>near by your location</h1>
                           <br/>
                           {/* {
                              this.state.spec1?
                              <Autocomplete value={this.state.temp} suggestions={this.state.spec1}/>
                              : null
                           }     */}
                           <form onSubmit={(e) => this.articleSearch(e)} className="article-search">
                              <div className="col-md-12 row">
               <div className="col-md-10 p-0">    
               <Autocomplete className="bg-white color-black"
               freeSolo
                  
                  value={this.state.article}
                  onChange={(event, newValue) => {
                     this.setState({
                        article: newValue
                     })
                     console.log(this.state.article)

                  }}
                  inputValue={this.state.article ? this.state.article : ''}
                  onInputChange={(event, newInputValue) => {
                     this.setState({
                        article: newInputValue
                     })
                     console.log(this.state.article)
                   }}
                  id="combo-box-demo"
                  options={this.state.spec1}
                  sx={{ width: 300 }}
                  
                  renderInput={(params) => <TextField {...params} label="Search Articles" />}
               />
            </div>
            <div className="col-md-2 p-0 mainBtn">
            <button className="btn btn-article-search color-white" type="submit">
               <i class="fas fa-search"></i>
            </button>
            </div>
            </div>
            </form>
                        </div>
                     </div>   
                     
                  </div>
                  {/* <SearchField 
  placeholder='Search articles'
  
/> */}
                  
               </section>
               
               <section className="megaSearch">
                  
                  <div className="container">
                  
                     <div className="row">
                     <Test
        show={this.state.modalShow}
        onHide={() => this.setModalShow(false)}
      />
                        <div className="search-wrap-inner clearfix">
                        <form onSubmit={(e) => this.onSearch(e)} className="mainSearch" >
                     	  {/* <div className="col-md-6 pd-0 col-sx-12 col-sm-4">
                   			<div className="form-group search"> */}
                            <div className="col-md-12 p-0">
                            <div className="row">
                            <div className="doc-name col-md-6 col-sm-12">
                            <Autocomplete className="bg-white color-black"
                              freeSolo
                              value={this.state.name}
                              onChange={(event, newValue) => {
                                 this.setState({
                                    name: newValue
                                 })
                                 console.log(this.state.name)
                              }}
                              inputValue={this.state.name ? this.state.name : ''}
                              onInputChange={(event, newInputValue) => {
                                 this.setState({
                                    name: newInputValue
                                 })
                                 console.log(this.state.name)
                              }}
                              id="combo-box-demo"
                              options={
                                 this.state.doctorLoaded? 
                                 this.state.doctor.map.Doctorname.myArrayList
                                 : []
                                 }
                              // sx={{ width: 600 }}
                                 
                              renderInput={(params) => <TextField {...params} label="Search Doctors (Name)" />}
                           />
                            </div>
                            
                                 {/* </div>
                              </div> */}
                              {/* <div className="col-md-5 pd-0 col-sx-12 col-sm-4">
                                 <div className="form-group city zipcode"> */}
                                 <div className="city-name col-md-5">
                                 <Autocomplete className="bg-white p-0 color-black"
                              freeSolo
                              value={this.state.city}
                              onChange={(event, newValue) => {
                                 this.setState({
                                    city: newValue
                                 })
                                 console.log(this.state.city)
                              }}
                              inputValue={this.state.city ? this.state.city : ''}
                              onInputChange={(event, newInputValue) => {
                                 this.setState({
                                    city: newInputValue
                                 })
                                 console.log(this.state.city)
                              }}
                              id="combo-box-demo"
                              options={this.state.cityList }
                              // sx={{ width: 490 }}
                                 
                              renderInput={(params) => <TextField {...params} label="Search Doctors (City or Pincode)" />}
                           />
                                 </div>
                                 
                                 <div className="mainBtn col-md-1">
                           <button type="submit" className=" btn btn-article-search color-white float-right" >
                                 <i class="fas fa-search"></i>
                              </button>
                              </div>
                              </div>
                              </div>
                	    	{/* </div>
                		 </div> */}
                              
              			  <input type="hidden" name="Latitude" id="Latitude"  className="form-control"/>
    	 
                       	 <input type="hidden" name="Longitude" id="Longitude"  className="form-control"/>
                       	                                                 
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
         
         <button i className=" newsletter-icon btn  newsletter_float" data-toggle="modal"data-target=".bd-example-modal-lg">
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
                        <div className="btn-Gropu">
                           <a href="/#" className="appBTN">App Store</a>
                           <a href="/#" className="appBTN">App Store</a>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-sx-12">
                     <div className="subscribe">
                        <h1>All Cures</h1>
                        <h2>Sign up for our free <br/>All Cures Daily Newsletter</h2><br/>
                        <h2>Get doctor-approved health tips, news, and more</h2>
                        <div className="form-group relative">
                           <div className="aaa">
                              <input type="number" name="" onChange={this.setMobile} className="form-control" placeholder="Please Share Your Mobile Number"/>
                              
                           </div>
                           <div>
                              {/* <a href="/#" className="subscribeBtn">Subscribe</a> */}
                              
                              {
                                        this.state.ShowSubmitAlert
                                            ? <SubmitAlert ShowSubmitAlert={this.state.ShowSubmitAlert}/>
                                            : console.log('Submit ALert')
                                    }

                                    {
                                        this.state.ShowErrorAlert
                                            ? <SubmitError ShowErrorAlert={this.state.ShowErrorAlert}/>
                                            : console.log('')
                                    }
                                <button className="bcolor"onClick={( ) => {this.postSubscribtion()}}>Submit
                                
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
           <Dropdown.Toggle  className="header-drop text-capitalize">
           Hi {props.userName}
           </Dropdown.Toggle>
           <Dropdown.Menu>
             <Dropdown.Item>
             <Link  className="text-dark btn" to={`/user/profile/`}>
                               Profile
                      </Link>
             </Dropdown.Item>
             <Dropdown.Item >
             <Link to="/dashboard" className="text-dark btn">
                Dashboard</Link>
             </Dropdown.Item>
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
         className="btn btn-dark text-light border loginSignbtn color-blue-dark" 
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

// SHOW ALERT

function SubmitAlert(props) {
   console.log('Submit ALert', props.ShowSubmitAlert)
   if(props.ShowSubmitAlert) {
       return(
           <Alert className="bg-green">Subscribe has been saved successfully!</Alert>
       );
   }
}

// Show Error Alert

function SubmitError(props) {
   console.log('Submit ALert', props.ShowErrorAlert)
   if(props.ShowErrorAlert) {
       return(
           <Alert className="bg-red">Please Provide Your Mobile Number!</Alert>
       );
   }
}

export default Home;
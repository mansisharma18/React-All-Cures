import React, { Component } from "react";
import './header.css';
import '../../assets/healthcare/css/mobile.css'
import Cookies from 'js-cookie';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import Heart from"../../assets/img/heart.png";
import { Link } from "react-router-dom";
import { Navbar} from "react-bootstrap"
import { Nav,NavDropdown,Container} from "react-bootstrap"
import Test from '../LandingPage/test'
import { backendHost } from '../../api-config';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';



import Account from '../../assets/icon/icons-AllCures/account_circle_black_48dp.svg'
import CreateCures from '../../assets/icon/icons-AllCures/edit_black_48dp.svg'
import List from '../../assets/icon/icons-AllCures/list_black_48dp.svg'
import { userAccess } from "../UserAccess";

   class Header extends Component {
       
        constructor(props){
            super(props);
            var prevPageType = props.url ? props.url.split('/')[1] : '' ;
            var prevPageVal = prevPageType !='' ? props.url.split('/')[2] : '';
            var prevPageVal3 = prevPageType !='' ? props.url.split('/')[3] : '';
            this.state = {
               users: '',
               texts: '',
               city: '',
               name: '',
               city: prevPageType == 'search' ? prevPageVal : '',
             
               name: prevPageType == 'searchName' ? prevPageVal : prevPageType == 'search' ? prevPageVal3 : '',
               cityList: [],
               pinList: [],
               
               suggestions: [],
               suggestionsDoc: [],
               diseaseTitle: [],
               doctorLoaded: false,
               doctor : '',
               spec1: [],
               getPincode:null,
               getCityName:null,
               docname : '',
               article: '',
               showMenu: false,
               
               searchParams: {
                  city: '',
                  Pincode: '',
                  name: '',
               }
              
            };
     
       
        }
    
       
      
      
        componentDidMount(){
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
          .catch(res => null)

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
            .catch(res => null)
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
            .catch(res =>  null)
          }
          loaddoctor();
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
         
          setModalShow =(action) => {
            this.setState({
              modalShow: action
            })
          }
         
         handleChange = e => 
            this.setState({
               searchParams: { ...this.state.searchParams, [e.target.name]: e.target.value }
            });
    
         logout = async e => {
            // await fetch(`${backendHost}/LogoutActionController`, {
            //    method: "POST"
            // })
            axios.defaults.withCredentials = true
            axios.post(`${backendHost}/LogoutActionController`,
            { headers: {'Access-Control-Allow-Credentials': true}
            }).then(res => {
               Cookies.remove('uName')
               setTimeout(() => {
                  window.location.reload()
               }, 500);
            }).catch(res => null)
            
         }

   onSearch = (e) => {
      var {city, name } = this.state
      e.preventDefault()
      if(city && name){
         this.props.history.push(`/search/${city}/${name}`)
      } else if(city){
         this.props.history.push(`/search/${city}`)
      } else if(name) {
         this.props.history.push(`/searchName/${name}`)
      }
   }
   
   onChangeArticle = (e , newValue) => {
      this.setState({
         article: newValue
      })
   }
   
   articleSearch = (e) => {
      e.preventDefault()
      if(this.state.article === ''){
         this.props.history.push(`/searchcures`)
      } else if(this.state.article){
         this.props.history.push(`/searchcures/${this.state.article}`)
      } else {
         this.props.history.push(`/searchcures`)
      }
   }
   render() {
      return(
         <div className="profilePage">
            <div className="">
               <section className="pageHeader zIndex-2" >
                  <div className="container">
                     <div className="row">
                        <div className="header" style={{width:"100%"}}>
                           <div className=" logo mt-3"> 
                              <Link to='/home'>
                                <img src={Heart} alt="All Cures Logo"/>
                                <span>All Cures</span>
                              </Link>
                           </div>
                           <div class="fgrow"><Navbar bg="light" expand="lg">
  <Container>
  
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/home" id="basic-nav-dropdown">Home</Nav.Link>
       
        <NavDropdown title="Categories" id="basic-nav-dropdown" renderMenuOnMount={true}>
          <NavDropdown.Item href="/searchcategory/disease/1">Arthritis</NavDropdown.Item>
          <NavDropdown.Item href="/searchcategory/disease/74"> Diabetes</NavDropdown.Item>
          <NavDropdown.Item href="/searchcategory/disease/50">Hypertension</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="/allcategory">View More</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Trending Cures" id="basic-nav-dropdown" renderMenuOnMount={true}>
          <NavDropdown.Item href="/searchmedicine/medicinetype/1">Ayurveda</NavDropdown.Item>
          <NavDropdown.Item href="/searchmedicine/medicinetype/4"> Chinese Medicine</NavDropdown.Item>
          <NavDropdown.Item href="/searchmedicine/medicinetype/3">Persian</NavDropdown.Item>
          <NavDropdown.Item href="/searchmedicine/medicinetype/2">Unani</NavDropdown.Item>
          <NavDropdown.Item href="/searchmedicine/medicinetype/6">Japanese</NavDropdown.Item>
          <NavDropdown.Item href="/searchmedicine/medicinetype/5">Scandinavian</NavDropdown.Item>
        
        </NavDropdown>
       
        <Nav.Link href="/AboutUs" id="basic-nav-dropdown">About Us</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar></div>
                           <form onSubmit={(e) => this.articleSearch(e)} className="" id="searchArticle">
                              <div className="col-md-12 row" >
                                 <div className="col-md-10 p-0">    
                                    <Autocomplete className="bg-white color-black"
                                       freeSolo
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
                                       options={this.state.article?
                                          this.state.article.length >=1 ? 
                                          this.state.diseaseTitle 
                                          : [] 
                                       : []}
                                       sx={{ width: 150}}
                                       renderInput={(params) => <TextField {...params} label="Search Cures" required />}
                                    />
                                 </div>
                                 <div className="col-md-2 p-0 mainBtn">
                                    <button className="btn search-main-btns color-white" id="searchHead"type="submit">
                                       <i className="fas header-search fa-search" id="iconSearch"></i>
                                    </button>
                                 </div>
                              </div>
                           </form>

                           <div className="loginSign">
                           {
                              userAccess?
                              <Link className="btn mr-2 primary-btn-color loginSignbtn color-blue-dark" id="Article" to="/article">
                              <img src={CreateCures} alt="create cures" className='filter-white' height="30px"/>
                            </Link>
                              : <button 
                              className="btn mr-2 primary-btn-color loginSignbtn color-blue-dark" id="Article" 
                              onClick={() => this.setModalShow(true)}
                            >
                              <img src={CreateCures} alt="create cures" className='filter-white' height="30px"/>
                            </button>
                           }   
                           <ToggleButton 
                              userName={Cookies.get('uName')} 
                              setModalShow={this.setModalShow} 
                              userAccess={userAccess} 
                              logout={this.logout}
                           /> 
                           </div>   	
                        </div>
                    </div>
                    </div>
                </section>
                <section className="megaSearch zIndex-1">
         <div className="container">
            <div className="row">
               <div className="search-wrap-inner clearfix">
               <form onSubmit={(e) => this.onSearch(e)} className="mainSearch" id="searchMain">
                     	  {/* <div className="col-md-6 pd-0 col-sx-12 col-sm-4">
                   			<div className="form-group search"> */}
                            <div className="col-md-12 p-0" id="mt">
                            <div className="row">
                            <div className="doc-name col-md-6 col-sm-12" id="searchDoc">
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
                              options={this.state.doctorLoaded ?
                                 this.state.name?
                                 this.state.name.length >= 1? 
                                    this.state.doctor.map.Doctorname.myArrayList
                                    : []
                                 : []
                                 :[]
                                 }
                              renderInput={(params) => <TextField {...params} label="Search Doctors (Name)"
                             
                             />}
                           />
                            </div>
                                 <div className="city-name col-md-5"id="searchCity">
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
                                 :[] }
                              renderInput={(params) => <TextField {...params} label="Search Doctors (City or Pin)" />}
                           />
                                 </div>
                                 
                                 <div className="mainBtn col-md-1">
                           <button type="submit" className=" btn search-main-btns btn-article-search color-white float-right" id="searchBtn" >
                                 <i className="fas fa-search" id="iconSearch"></i>
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
            <Test
               show={this.state.modalShow}
               onHide={() => this.setModalShow(false)}
            />
      </section>
            </div>
        </div>
        );
   }
}
function ToggleButton(props) {
   if(props.userAccess){
       return(
         <>
         <Dropdown>
           <Dropdown.Toggle  className="header-drop text-capitalize" id="dropHead">
          
           <img alt="list" className='filter-white' src={Account} height="30px" />
           </Dropdown.Toggle>
           <Dropdown.Menu>
             <Dropdown.Item>
             <Link  className="text-dark btn" to={`/user/profile`}>
                               Profile
                      </Link>
             </Dropdown.Item>
             <Dropdown.Item >
               <Link to="/editSubscribe" className="text-dark btn">
                  Edit Subscription</Link>
               </Dropdown.Item>
            
               <Dropdown.Item >
               <Link to="/chatlist" className="text-dark btn">
               My Inbox</Link>
               </Dropdown.Item>

             { props.userAccess >= 4?
               <Dropdown.Item >
               <Link to="/dashboard" className="text-dark btn">
                  Dashboard</Link>
               </Dropdown.Item>
               :  <Dropdown.Item >
               <Link to="/my-cures" className="text-dark btn">
                  My Favourite Cures</Link>
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
         className="btn primary-btn-color text-light loginSignbtn color-blue-dark" 
         id="signIn"
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

export default Header;

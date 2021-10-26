import React, { Component } from "react";
import './header.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Dropdown, DropdownButton, Nav } from 'react-bootstrap';
import Heart from"../../assets/img/heart.png";
import { Link } from "react-router-dom";
// import Autocomplete from '../Autocomplete'
import Test from '../LandingPage/test'
import { backendHost } from '../../api-config';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
   class Header extends Component {
       
        constructor(props){
            super(props);
            this.state = {
               users: '',
               texts: '',
               city: '',
               cityList: [],
               pinList: [],
               name: '',
               suggestions: [],
               suggestionsDoc: [],
               doctorLoaded: false,
               doctor : '',
               spec1: [],
               getPincode:null,
               getCityName:null,
               docname : '',
               article: '',
                acPerm: Cookies.get('acPerm'),
                searchParams: {
                  city: '',
                  Pincode: '',
                  name: '',
              }
            };
        }


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
            console.log('spec1111111111111111111111: ', this.state.spec1)
          })
          .catch(res => {
             console.error(res)
          })

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
               console.log('CIty & pincode: ', this.state.users)
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
            })
            .catch(res =>  console.log(res))
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
         
          setModalShow =(action) => {
            this.setState({
              modalShow: action
            })
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
            const res = await fetch(`${backendHost}/LogoutActionController`, {
               method: "POST"
            });
            setTimeout(() => {
               window.location.reload()
            }, 1000);
         }

   onSearch = (e) => {
      var {city, name } = this.state
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
   
   onChangeArticle = (e , newValue) => {
      this.setState({
         article: newValue
      })
      console.log(this.state.article)
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
      const userStyle ={
        display: 'grid',
        gridTemplateColumns: 'repeat(2,1fr)',
        gridGap:'1rem' 
      }
        return(
            <div className="profilePage">
                <div className="comman-pg-header">
                <section className="pageHeader zIndex-2">
                    <div className="container">
                    <div className="row">
                        <div className="header" style={{width:"100%"}}>
                        <div className="logo"> 
                            <Link to='/home'>
                                <img src={Heart} alt="All Cures Logo"/>
                                <span>All Cures</span>
                            </Link>
                        </div>
                        
                        <Nav className="me-auto">
                            <Dropdown>
                            <Dropdown.Toggle className="nav-dropdown-link">
                            <span className="text-dark fs-6">Health</span>

                            </Dropdown.Toggle>
                            <Dropdown.Menu className="disease-drop" style={userStyle}>
                              <div>
                              <Dropdown.Header className="col-8 col-md-6 h5 font-weight-bold border-dark">
                                Common Conditions</Dropdown.Header>
                                <span className="border-btm"></span>
                                <Link to="/blogs/arthritis" class="text-dark pl-4">Arthritis</Link>
                                <Dropdown.Item >Alergies</Dropdown.Item>
                                <Dropdown.Item >Cancer</Dropdown.Item>
                                <Dropdown.Item >Cardiology</Dropdown.Item>
                                <Dropdown.Item >Coronavirus(Covid-19)</Dropdown.Item>
                                <Dropdown.Item >Coronavirus(Covid-19)</Dropdown.Item>
                                 <Dropdown.Item >Coronavirus(Covid-19)</Dropdown.Item>
                                <Dropdown.Item >Coronavirus(Covid-19)</Dropdown.Item>
                                </div>
                                <div>
                                <Dropdown.Header className="col-4 col-md-6 h5 font-weight-bold ">
                                Resources</Dropdown.Header>
                                <span className="border-btm"></span>
                                <Dropdown.Item >Alergies</Dropdown.Item>
                                <Dropdown.Item >Cancer</Dropdown.Item>
                                <Dropdown.Item >Cardiology</Dropdown.Item>
                                <Dropdown.Item >Coronavirus(Covid-19)</Dropdown.Item>
                                </div>
                            </Dropdown.Menu>
                            {/* </div> */}
                            </Dropdown>
                            <div >
  {/* <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Action                      */}
              

  {/* </button> */}
  
</div>
{/* <div>
      <Nav.Link className="nav-dropdown-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#features">Supplements</Nav.Link></div>
      <div>
      <Nav.Link className="nav-dropdown-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#pricing">News</Nav.Link>
      </div> */}
      
    </Nav>
    {/* <Form inline>
              <FormControl type="text" variant="outline-success" onChange={this.handleChange} placeholder="Search" className="mr-sm-2" required aria-required="true"/> */}

              {/* {
                  this.state.spec1?
                    <Autocomplete value={this.state.temp} suggestions={this.state.spec1}/>
                  : null
                } */}
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
                        <div className="loginSign">
                            <ToggleButton userName={Cookies.get('uName')} setModalShow={this.setModalShow} acPerm={this.state.acPerm} logout={this.logout}/> 
                        </div>   	
                        </div>
                    </div>
                    </div>
                </section>
                <section className="megaSearch zIndex-1">
         <div className="container">
            <div className="row">
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

export default Header;
import React, { Component } from "react";
import './header.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Dropdown, DropdownButton, Nav } from 'react-bootstrap';
import Heart from"../../assets/img/heart.png";
import { Link } from "react-router-dom";
import Autocomplete from '../Autocomplete'

   class Header extends Component {
       
        constructor(props){
            super(props);
            this.state = {
               users: '',
               texts: '',
               suggestions: [],
               suggestionsDoc: [],
               doctor : '',
               spec1: [],
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
         Promise.all([
            fetch('/article/all/table/disease_condition').then(res => res.json()),
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
            const loadUsers = async () => {
               const response = await axios.get('/city/all');
               this.setState ({
                  users: response.data
               })
             }
             loadUsers();
         
            const loaddoctor = async () => {
               const response = await axios.get('/IntegratedActionController');
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
            setTimeout(() => {
               window.location.reload()
            }, 1000);
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
<div>
      <Nav.Link className="nav-dropdown-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#features">Supplements</Nav.Link></div>
      <div>
      <Nav.Link className="nav-dropdown-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#pricing">News</Nav.Link>
      </div>
      
    </Nav>
    {/* <Form inline>
              <FormControl type="text" variant="outline-success" onChange={this.handleChange} placeholder="Search" className="mr-sm-2" required aria-required="true"/> */}
              {
                  this.state.spec1?
                    <Autocomplete value={this.state.temp} suggestions={this.state.spec1}/>
                  : null
                }
              {/* <Link
                className="btn btn-outline-success" 
                id="search"
                to={`/blogs/${this.state.disease}`}>
                  Search
              </Link> */}
              {/* <Link className variant="outline-success">Search</Link className> */}
            {/* </Form> */}
        
                        <div className="loginSign">
                        {/* <Link to="/profile">Go to Profile</Link> */}
                {/* <Link to={{pathname: this.props.match.url, search: '?login=true'}}>Login</Link> */}
                            {/* <Container className="btn-white loginSignbtn color-blue-dark" triggerText={this.state.triggerText} onSubmit={this.onModalSubmit} /> */}
                            {/* <ToggleButton acPerm={this.state.acPerm} match={this.props.match.url} />  */}

                            <ToggleButton acPerm={this.state.acPerm} url={this.props.url} logout={this.logout}/> 
                        </div>   	
                        </div>
                    </div>
                    </div>
                </section>
                <section className="megaSearch zIndex-1">
         <div className="container">
            <div className="row">
               <div className="search-wrap-inner clearfix">
                        <form class="mainSearch" >
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
                                 {this.state.suggestions && this.state.suggestions.map((suggestion, i) =>
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
                       			  {/* <Link 
                                     type="
                                     submit" 
                                     className="btn-bg searchBtn" 
                                     id="search"
                                     to={ `/search/${this.state.searchParams.city}/${this.state.searchParams.name}`}
                                     >Search</Link>  */}
                                     <Link 
                                     type="
                                     submit" 
                                     className="btn-bg searchBtn" 
                                     id="search"
                                     to={
                                       this.state.searchParams.name
                                       ?  `/searchName/${this.state.searchParams.name}`
                                       : `/search/${this.state.searchParams.city}/${this.state.searchParams.name}`
                                    }>Search</Link>
                           	 </div>
                       	 </div> 
                       	                                                 
                        </form>
                    
                  </div>
               </div>   
            </div>
      </section>
            </div>
        </div>
        );
    }
}

function ToggleButton(props) {
    if(props.acPerm){
        return(
            <DropdownButton style={{background: 'white'}} title="Hi there!">
            <Dropdown.Item >
            <Link to="/dashboard">
               Dashboard
           </Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={props.logout}>Logout</Dropdown.Item>
         </DropdownButton>
        );
    }
    return(
        <Link 
         className="btn-white loginSignbtn color-blue-dark" 
         to={{pathname: props.url, search: '?login=true', state: {open: true}}}
        >
            Sign Up
        </Link>
    )
}

export default Header;
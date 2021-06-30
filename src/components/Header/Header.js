import React, { Component } from "react";
import './header.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import Heart from"../../assets/img/heart.png";
import { Link } from "react-router-dom";
// import { Container } from '../Modal/Container';

// import { ToggleButton } from "react-bootstrap";
/*class Header extends Component {

    constructor(props){
        super(props);
        // const params = props.match.params
        this.state = {
            url: props.url,
            acPerm: Cookies.get('acPerm'),
            // param: params,
            searchParams: {
                city: 'Jammu',
                name: '',
            }
        };
    } */
    class Header extends Component {
        constructor(props){
           super(props);
           this.state = {
              users: '',
              texts: '',
              suggestions: [],
              suggestionsDoc: [],
              doctor : '',
              docname : '',
              url: props.url,
               acPerm: Cookies.get('acPerm'),
               searchParams: {
                 city: '',
                 name: '',
             }
           };
       }
       componentDidMount(){
        const loadUsers = async () => {
           const response = await axios.get('/city/all');
           this.setState ({
              users: response.data
           })
           // console.log("userssss"+ users)
         }
         loadUsers();
     //  }
     //  componentDidMount(){
        const loaddoctor = async () => {
           const response = await axios.get('/IntegratedActionController');
           this.setState ({
              doctor: response.data
           })
           console.log("doctorsssssssssssssss", this.state.doctor)
         }
         loaddoctor();
      }
     
       onSuggestHandler = (text) => {
          this.state.searchParams.city= text;
          this.setState({
             suggestions: []
          });
      }
      onChangeHandler = (e, text) => {
        let matches = []
        if (text.length > 0) {
          matches = this.state.users.filter(user => {
            const regex = new RegExp(`${text}`, "gi");
            return user.Cityname.match(regex)
          })
        }
        console.log('users'+this.state.users)
        console.log('matches', matches)
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
      //console.log('doctor'+this.state.doctor)
      //console.log('matches', matches)
      this.setState({
         texts: text,
         suggestionsDoc: matches,
         searchParams: { ...this.state.searchParams, [e.target.name]: text }
     
      });
     }

    onModalSubmit = (event) => {
        event.preventDefault(event);
        console.log(event.target.name.value);
        console.log(event.target.email.value);
    };

    handleChange = e => 
        this.setState({
            searchParams: { ...this.state.searchParams, [e.target.name]: e.target.value }
        });
    
        logout = async e => {
            const res = await fetch("/LogoutActionController", {
               method: "POST"
            });
              const data = await res.text();
              console.log("Logout: ", data)
              setTimeout(() => {
                 window.location.reload()
              }, 1000);
         }
    render() {
        // console.log(this.state.history);
    //     const params = new URLSearchParams(this.props.location);

    // console.log('jddowbolbwolecnloceb', params.entries)
        // console.log('Match params: ', this.state.param)
        console.log('Header Urllll', this.props.url)
        return(
            <div className="profilePage">
                <div className="comman-pg-header">
                <section className="pageHeader">
                    <div className="container">
                    <div className="row">
                        <div className="header" style={{width:"100%"}}>
                        <div className="logo"> 
                            <Link to='/home'>
                                <img src={Heart}/>
                                <span>All Cures</span>
                            </Link>
                        </div>
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
                <section className="megaSearch">
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
                                  {this.state.suggestionsDoc.map((item,index)=>{
         // return <p key={index}>{item}</p>
       return  <li key={index} className="sug col-md-12 justify-content-md-center"
                                       onClick={() => this.onSuggestHandlerdoctor(item)}
                                    >{item}</li>
       })}
							</div>
						 </div>
   						 <div className="col-md-4 pd-0 col-sx-12 col-sm-4">
         				 	<div className="form-group city zipcode">
    							<input type= "text" placeholder="City or Zip-code" name="city" id="city" 
                                autoComplete="off" 
                                onChange={e => this.onChangeHandler(e, e.target.value)} 
                                value={this.state.searchParams.city} 
                                className="formVal form-control"
                                />
                                {this.state.suggestions && this.state.suggestions.map((suggestion, i) =>
                                   <div key={i} className="suggestion col-md-12 justify-content-md-center"
                                      onClick={() => this.onSuggestHandler(suggestion.Cityname)}
                                   >{suggestion.Cityname}</div>
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
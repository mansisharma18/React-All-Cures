import React, { Component } from "react";
import './header.css';
// import {
//   Navbar,
//   NavbarBrand,
//   Nav,
//   NavbarToggler,
//   Collapse,
//   NavItem,
//   Button,
// } from "reactstrap";
// import { NavLink } from "react-router-dom";
// import history from 
import Heart from"../../assets/img/heart.png";
import { Link, withRouter } from "react-router-dom";
class Header extends Component {

    constructor(props){
        super(props);
        this.state = {};
        this.onLogout = this.onLogout.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }
    onLogout() {
        this.props.history.push('/profile');
    }
    // handleChange(event) {
    //     this.setState({value: event.target.value});
    // }
    render() {
        // console.log(this.state.history);
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
                            {/* <a href="index.html"> 
                                <img src={Heart}/>
                                <span>All Cures</span>
                            </a>  */}
                        </div>
                        <div className="loginSign"> 
                            <a href="" id="userLogin" className="btn-white loginSignbtn color-blue-dark" data-toggle="modal" data-target="#myModal">Log in / Sign up</a> 
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
    							<input type="text" placeholder="Doctor Name, Disease or Condition" name="doctors" id="doctors"  className="formVal form-control "/>
								<span className="icon-loupe"></span>
							</div>
						 </div>
   						 <div className="col-md-4 pd-0 col-sx-12 col-sm-4">
         				 	<div className="form-group city zipcode">
    							<input type= "text" placeholder="City or Zip-code" name="city" id="city" className="formVal form-control" />
                	    	</div>
                		 </div>
         					 
              			  <input type="hidden" name="Latitude" id="Latitude"  className="form-control"/>
    	 
                       	 <input type="hidden" name="Longitude" id="Longitude"  className="form-control"/>
                         <div className="col-md-4 pd-0 col-sx-12 col-sm-4">
         					 <div className="form-group date">
                       			  <input type="date" name="" placeholder="Date" className="form-control"/>
                       			  <button 
                                     type="
                                     submit" 
                                     className="btn-bg searchBtn" 
                                     id="search"
                                     onClick={this.onLogout}
                                     >Search</button> 
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

export default Header;
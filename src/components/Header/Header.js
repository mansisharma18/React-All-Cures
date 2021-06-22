import React, { Component } from "react";
import './header.css';
import Cookies from 'js-cookie';

import Heart from"../../assets/img/heart.png";
import { Link } from "react-router-dom";
// import { Container } from '../Modal/Container';

// import { ToggleButton } from "react-bootstrap";
class Header extends Component {

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

                            <ToggleButton acPerm={this.state.acPerm} url={this.props.url}/> 
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
    							<input type="text" placeholder="Doctor Name, Disease or Condition" name="name" id="doctors" onChange={this.handleChange} value={this.state.searchParams.name} className="formVal form-control "/>
								<span className="icon-loupe"></span>
							</div>
						 </div>
   						 <div className="col-md-4 pd-0 col-sx-12 col-sm-4">
         				 	<div className="form-group city zipcode">
    							<input type= "text" placeholder="City or Zip-code" name="city" id="city" onChange={this.handleChange} value={this.state.searchParams.city} className="formVal form-control" />
                	    	</div>
                		 </div>
         					 
              			  <input type="hidden" name="Latitude" id="Latitude"  className="form-control"/>
    	 
                       	 <input type="hidden" name="Longitude" id="Longitude"  className="form-control"/>
                         <div className="col-md-4 pd-0 col-sx-12 col-sm-4">
         					 <div className="form-group date">
                              <input type="text" name="" placeholder="Date" className="form-control" onFocus={(e) => e.target.type = 'date'}/>
                       			  <Link 
                                     type="
                                     submit" 
                                     className="btn-bg searchBtn" 
                                     id="search"
                                     to={ `/search/${this.state.searchParams.city}/${this.state.searchParams.name}`}
                                     >Search</Link> 
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
            <Link to="/dashboard" className="btn-white loginSignbtn color-blue-dark" >
                Dashboard
            </Link>
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
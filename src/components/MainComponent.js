import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
// import Carousel from "./Carousel";
import Home from "./LandingPage/Home";
import Profile from "./Profile/Profile";
import Article from "./Article/Article";
import Search from "./Search/Search";
// import About from "./AboutComponent";
// import Signup from "./SignupCpnt";
// import Services from "./Services";
// import Health from "./Health";
// import Login from "./LoginComponent";
// import Appointment from "./Appointment";
// import Dashboard from "./Dashboard";

class Main extends Component {
  render() {
    return (
      <div>
        <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/article" component={Article} />

          <Route exact path="/search" component={Search} />
          {/* <Route exact path="/appointment" component={Appointment} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/health" component={Health} />
          <Route exact path="/dashboard" component={Dashboard} /> */} 
          <Redirect to="/" />
        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Main;
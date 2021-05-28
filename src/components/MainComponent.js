import React, { Component } from "react";
import Cookies from 'js-cookie';
import {BrowserRouter,Router, Switch, Route, Redirect } from "react-router-dom";

import Home from "./LandingPage/Home";
import Profile from "./Profile/Profile";

import Search from "./Search/Search";

import Modal from './Modal';
import AuthApi from './AuthApi'
import Disease from "./Disease/Disease";
import Test from "./Article/test";
import Dashboard from "./Dashboard/Dashboard.js";
import Login from "./login/login";
import SignIn from "./Article/SignIn"
import TestAjax from "./Test/TestAjax"
// import Sibling1 from "./Test/TestPC"

// import Login from './login/login'

function Main() {
  // render() {
    const [auth, setAuth] = React.useState(false);
  const readCookie = () => {
    const user = Cookies.get("acPerm")
    if(user){
      setAuth(true);
    }
  }
  React.useEffect(() => {
    readCookie();
  }, [])
    return (
      <div>
        <AuthApi.Provider value={{auth, setAuth}}>
          <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
          {/* <Router> */}
            <Routes/>
            {/* </Router> */}
          </BrowserRouter>
        </AuthApi.Provider>
      </div>
    );
  // }
}

// const Login = () => {
//   const Auth = React.useContext(AuthApi)
//   const handleOnClick = () => {
//     Auth.setAuth(true)
//     Cookies.set("user", "loginTrue")
//   }
//   return(
//     <div>
//       <h1>Please Login</h1>
//       <button onClick={handleOnClick}>Login</button>
//     </div>
//   )
// }
// const Dashboard = () => {
//   const Auth = React.useContext(AuthApi)
//   const handleOnClick = () => {
//     Auth.setAuth(false)
//     Cookies.remove("user")
//   }
//   return(
//     <div>
//       <h1>Dashboard</h1>
//       <button onClick={handleOnClick}>Logout</button>
//     </div>
//   )
// }

const Routes = () => {
  const Auth = React.useContext(AuthApi)
  return (
    <Switch>
       <Route exact path="/" component={Home} />
       <Route exact path="/disease" component={Disease}/>
          <Route exact path="/home" component={Home} />
         {/* <ProtectedRoute path="/profile" auth={Auth.auth} component={Profile} />
          {/* <Route exact path="/login" component={Modal} /> */}

          <Route exact path="/search" component={Search} />
          <Route exact path="/search/:city" component={Search} />
          <Route path="/search/:city/:name" component={Search} />
          <Route exact path="/article" component={Test} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/sign" component={SignIn} />
          {/* <Route exact path="/login" component={Login} /> */}
      <ProtectedLogin path="/login" component={Login} auth={Auth.auth}/>
      {/* <ProtectedRoute path="/dashboard" auth={Auth.auth} component={Dashboard}/> */}
      {/* <Route path="/profile" auth={Auth.auth} component={Profile}/> */}
      <Route path="/profile/:id" component={Profile}/>
      <Route exact path="/TestAjax" component={TestAjax} />
      {/* <Route exact path="/TestPC" component={Sibling1} /> */}


    </Switch>
  )
}

const ProtectedRoute = ({auth, component:Component, ...rest}) => {
  console.log(auth)
    return(
      <Route
      {...rest}
      render = {() =>auth ? (
        
        <Component/>
      ):
        (
          <Redirect to="/login"/>
        )
    }
      />
    )
}

const ProtectedLogin = ({auth, component:Component, ...rest}) => {
    return(
      <Route
      {...rest}
      render = {() =>!auth ? (
        <Component/>
      ):
        (
          <Redirect to="/profile"/>
        )
    }
      />
    )
}

export default Main;
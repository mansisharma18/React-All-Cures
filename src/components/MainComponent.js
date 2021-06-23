import React, { Component } from "react";
import Cookies from 'js-cookie';
import {BrowserRouter,Router, Switch, Route, Redirect } from "react-router-dom";

import Home from "./LandingPage/Home";
import Profile from "./Profile/Profile";

import Search from "./Search/Search";
import SearchName from './Search/SearchName';

// import Modal from './Modal';
import AuthApi from './AuthApi'
import Disease from "./Disease/Disease";
import Test from "./Article/test";
import Dashboard from "./Dashboard/Dashboard.js";
import LoginPage from "./login";
import SignIn from "./Article/SignIn";
// import { createBrowserHistory } from "history";
// import Modal from './Modal1/Modal.js';
// import TestAjax from "./Test/TestAjax"
// import Sibling1 from "./Test/TestPC"
// import LoginForm from './loginForm'

// import Login from './login/login'
// import createBrowserHistory from './history';

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
  // const history = createBrowserHistory;

  console.log('PROPSSSSSSSSSSSSSS: ')
  const Auth = React.useContext(AuthApi)

    return (
      <div>
        <AuthApi.Provider value={{auth, setAuth}}>
          <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
          {/* <Router> */}
            <Routes />
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
  // console.log('MATCHHHHHHHHHHHHHHHHHHH ', {match})
  const Auth = React.useContext(AuthApi)
  return (
    <>
    <Switch>
       <Route exact path="/" component={Home} />
       <Route exact path="/disease/:id" component={Disease}/>
          <Route exact path="/home" component={Home} />
         {/* <ProtectedRoute path="/profile" auth={Auth.auth} component={Profile} />
          {/* <Route exact path="/login" component={Modal} /> */}
          {/* <Route exact path="/loginForm" component={LoginForm}/> */}
          {/* <Route exact path="/search" component={Search} /> */}
          {/* <Route exact path="/modal" component={Modal} /> */}
          {/* <Route exact path="/search/:name" search = '?login=true' component={Search} />
          */}
          <Route exact path="/search/:city" component={Search} /> 
          <Route exact path="/searchName/:name" component={SearchName} /> 
          {/* <Route exact path="/search/:name" component={Search} /> */}
          <Route path="/search/:city/:name" component={Search} />
          {/* <Route path="/search/:city/:name" component={Search} /> */}

          <ProtectedRoute path="/article" auth={Auth.auth} component={Test} />
          <Route exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/sign" component={SignIn} />
          {/* <Route */}
      {/* <ProtectedLogin path= '#?login=true' auth={Auth.auth}/> */}
      {/* <ProtectedRoute path="/profile/:id" auth={Auth.auth} component={Profile} /> */}
      <Route exact path="/profile/:id" component={Profile} />

      {/* <Route exact path="/TestAjax" component={TestAjax} /> */}
    </Switch>
          <Route path="/" component={LoginPage}/>
    </>
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
          // <Redirect to="/login"/>
          <Redirect to={{pathname: '#', search: '?login=true', state: {open: true}}}/>
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
          <Redirect to="/article"/>
        )
    }
      />
    )
}

export default Main;
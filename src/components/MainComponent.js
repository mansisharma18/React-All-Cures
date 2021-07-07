import React from "react";
import Cookies from 'js-cookie';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./LandingPage/Home";
import Profile from "./Profile/Profile";

import Search from "./Search/Search";
import SearchName from './Search/SearchName';

// import Modal from './Modal';
import AuthApi from './AuthApi'
import Disease from "./Disease/Disease";
import Article from "./Article/Article.js";
import Dashboard from "./Dashboard/Dashboard.js";
import LoginPage from "./login";
import SignIn from "./Article/SignIn";
<<<<<<< HEAD
import TestHome from './LandingPage/TestHome';
// import { createBrowserHistory } from "history";
// import Modal from './Modal1/Modal.js';
// import TestAjax from "./Test/TestAjax"
// import Sibling1 from "./Test/TestPC"
// import LoginForm from './loginForm'

// import Login from './login/login'
// import createBrowserHistory from './history';
=======
import Blogpage from "./BlogPage/Blogpage";
>>>>>>> f4724d4131d5cdbc4d1cab34088d3bc2ef8673ea

function Main(props) {
  // render() {
  const [auth, setAuth] = React.useState(false);
  const readCookie = () => {
    const user = Cookies.get("acPerm")
    if(user){
      setAuth(true);
    }
  }
  const url = props.url;
  React.useEffect(() => {
    readCookie();
  }, [])
  // const history = createBrowserHistory;

  // const Auth = React.useContext(AuthApi)

    return (
      <div>
        <AuthApi.Provider value={{auth, setAuth}}>
          <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
          {/* <Router> */}
            <Routes url = {url}/>
            {/* </Router> */}

          </BrowserRouter>
        </AuthApi.Provider>
      </div>
    );
  // }
}

const Routes = (props) => {
  // let query = useQuery();
  const Auth = React.useContext(AuthApi)
  
  // const location = useLocation();
  // const currentPath = location.pathname;
  return (
    <>
    <Switch>
       <Route exact path="/" component={Home} />
<<<<<<< HEAD
       <Route exact path="/disease/:id" component={Disease}/>
          <Route exact path="/test_home">
            <TestHome/>
          </Route>
=======
       <Route exact path="/blogs/:id" component={Disease}/>
>>>>>>> f4724d4131d5cdbc4d1cab34088d3bc2ef8673ea
          <Route exact path="/home" component={Home} />
          <Route exact path="/search/:city" component={Search} /> 
          <Route exact path="/searchName/:name" component={SearchName} /> 
          {/* <Route exact path="/search/:name" component={Search} /> */}
          <Route path="/search/:city/:name" component={Search} />
          {/* <Route path="/search/:city/:name" component={Search} /> */}

          <Route path="/article" auth={Auth.auth} component={Article} />
          <Route exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/sign" component={SignIn} />
          <Route exact path="/blogs" component={Blogpage}/>
      <Route exact path="/profile/:id" component={Profile} />
    </Switch>
          <Route path="/" component={LoginPage}/>
          <ProtectedLogin path='?login=true' auth={Auth.auth}/>
          {/* <Child login={query.get("login")} url = {currentPath}/> */}
    </>
  )
}

const ProtectedRoute = ({auth, component:Component, ...rest}) => {
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
          <Redirect to="#"/>
        )
    }
      />
    )
}

export default Main;
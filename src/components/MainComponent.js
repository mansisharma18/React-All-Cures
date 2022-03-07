import React from "react";
import { Switch, Route, Redirect, useHistory, BrowserRouter } from "react-router-dom";
// import Heart from"../assets/img/heart.png";

import Heart from "../assets/img/heart.png"

import Home from "./LandingPage/Home";
import Profile from "./Profile/Profile";

import Search from "./Search/Search";
import SearchName from './Search/SearchName';

import AuthApi from './AuthApi'
import Disease from "./Disease/Disease";
import Dashboard from "./Dashboard/Dashboard.js";

import HelmetMetaData from "./HelmetMetaData";

import Blogpage from "./BlogPage/Blogpage";
import Medicinepage from "./BlogPage/Medicinepage";
import EditPost from './BlogPage/EditModal';
import BlogAllPost from './Dashboard/BlogAllPost'
import LoginInfo from './loginForm/LoginInfo'
import CommentsRev from './Dashboard/CommentsRev.js'
import Results from './Dashboard/Results.js'
import PromoPaid from './Dashboard/PromoPaid.js'
import PromoAdmin from './Dashboard/PromoAdmin.js'
import ResetPass from './loginForm/ResetPass.js'
import Verify from './loginForm/Verify.js'
import EditSubscribe from './Dashboard/EditSubscribe'
import DeleteSubscribe from './Dashboard/DeleteSubscribe'
import List from '../List'
import Userprofile from "./Profile/Userprofile";
import MyArticle from './Profile/MyArtcle'
import ListArticle from './Profile/ListArticle'
import NotFound from "./NotFound";
import { userAccess } from "./UserAccess";
import NotAuthorizedPage from "./NotAuthorizedPage";
import Feedback from "./Feedback";

function Main(props) {
  const history = useHistory()

  // render() {
  const [auth, setAuth] = React.useState('not-logged-in');
  const [authLoaded, setAuthLoaded] = React.useState(false);
  const readCookie = () => {

    var user = userAccess

    if(user >= 4 && user<10){             // user access for reviewer to admin previleges
      setAuth('admin')
    } else if(user >= 1 && user < 4){     // user access for normal users
      setAuth('normal-user')
    } else if(!user){                              // user access for not logged in users
      setAuth('not-logged-in')
    }
  }
  const url = props.url;
  React.useEffect(() => {
    // setAuth('authuhuhu', () => console.log('set auth: ', auth))
    readCookie();
  })

  React.useEffect(() => {
    setAuthLoaded(true)
  }, [auth])
  
  if(!authLoaded) {
    return(
      <div className="loader main">
        <img src={Heart} alt="All Cures Logo" id="heart"/>
      </div>
    )
  }
  else {
  return (
      <div>
        <AuthApi.Provider value={{auth, setAuth}}>
          <BrowserRouter history={history}>
            {/* <HelmetMetaData></HelmetMetaData> */}
            <Routes authLoaded={authLoaded} url = {url} userAccess = {userAccess}/>
          </BrowserRouter>
        </AuthApi.Provider>
      </div>
    );
  }
}

const Routes = (props) => {
  const Auth = React.useContext(AuthApi)
  return (
    <>
    <Switch>
      {/* Home Page */}

       <Route exact path="/" component={Home} />
       <Route exact path="/home" component={Home} />
       <Route exact path="/feedback" component={Feedback} />

      {/* Doctor search page */}
      <Route exact path="/search/:city" component={Search} /> 
      <Route exact path="/searchName/:name" component={SearchName} /> 
      <Route path="/search/:city/:name" component={Search} />

      {/* Article edit */}
      <ProtectedRoute auth={Auth.auth} path="/article/:id" component={EditPost}/>

      {/* Article creation page */}
      <ProtectedRoute auth={Auth.auth} path="/article" component={EditPost}/>

      {/* Dashboard pages */}
      <ProtectedRouteDashboard userAccess={props.userAccess} auth={Auth.auth} exact path="/dashboard" component={Dashboard} />
      <ProtectedRouteDashboard userAccess={props.userAccess} auth={Auth.auth} exact path="/dashboard/blogs" component={BlogAllPost} />
      <ProtectedRouteDashboard userAccess={props.userAccess} auth={Auth.auth} exact path="/dashboard/commentsrev" component={CommentsRev} />
      <ProtectedRouteDashboard userAccess={props.userAccess} auth={Auth.auth} exact path="/dashboard/results" component={Results} />
      <ProtectedRouteDashboard userAccess={props.userAccess} auth={Auth.auth} exact path="/dashboard/promopaid" component={PromoPaid} />
      <ProtectedRouteDashboard userAccess={props.userAccess} auth={Auth.auth} exact path="/dashboard/promoadmin" component={PromoAdmin} />
      <ProtectedRouteDashboard userAccess={props.userAccess} auth={Auth.auth} exact path="/dashboard/promoadmin" component={PromoAdmin} />

      {/* Cures list page */}
      <Route exact path="/searchcures" component={Blogpage}/>
      <Route path="/searchcures/:type" component={Blogpage}/>

      <Route exact path="/searchmedicine" component={Medicinepage}/>
      <Route path="/searchmedicine/medicinetype/:medicine_type" component={Medicinepage}/>

      {/* Cure according to article_id*/}
      <Route auth={Auth.auth} exact path="/cure/:cureType/:id" component={Disease}/>

      <Route auth={Auth.auth} exact path="/cure/:id" component={Disease}/>
      
      {/* Doctor profile page */}
      <Route auth={Auth.auth} exact path="/profile/:id" component={Profile} />
      <Route exact path="/profile/:id/edit" component={LoginInfo} />

      {/* Doctor invitation page and ask for UPNR number */}
      <Route exact path="/login/doctor" component={LoginInfo}/>

      {/* User's self profile */}
      <ProtectedRoute auth={Auth.auth} exact path="/user/profile" component={Userprofile} />
      
      {/* My articles */}
      <ProtectedRoute auth={Auth.auth} exact path="/my-cures" component={MyArticle} />
      <Route exact path="/ListArticle" component={ListArticle} />

      <Route exact path="/editsubscribe" component={EditSubscribe} />
      <Route exact path="/list" component={List} />
      <Route exact path="/deletesubscribe" component={DeleteSubscribe} />
      
      
      <Route exact path="/loginForm/ResetPass" component={ResetPass} />
      <Route exact path="/loginForm/verify" component={Verify} />

      {/* For not authorized users trying to access Dashboard */}
      <Route exact path="/forbidden" component={NotAuthorizedPage}/>
      {/* When the requested page is not available */}
      <Route path="*" component={NotFound} />

    </Switch>
    </>
  )
}

const ProtectedRoute = ({auth, path, component:Component, ...rest}) => {
    return(
      <Route
      {...rest}
      render = {() =>auth !== 'not-logged-in' ? (
        <Route exact path={path} component={Component} />        
      ):
        (
          // <Redirect to="/login"/>
          <Redirect to={{pathname: '/home', search: '', state: {modalShow: true, path: path}}}/>
        )
    }
      />
    )
}
const ProtectedRouteDashboard = ({auth, path, component:Component, userAccess, ...rest}) => {
    return(
      <Route
      {...rest}
      render = {() =>auth !== 'not-logged-in' && userAccess > 4? (
        <Route exact path={path} component={Component} />        
      ):
        (
          // <Redirect to="/login"/>
          
          <Redirect to={{pathname: '/forbidden', search: ''}}/>
        )
    }
      />
    )
}

// const ProtectedLogin = ({auth, component:Component, ...rest}) => {
//     return(
//       <Route
//       {...rest}
//       render = {() =>!auth ? (
//         <Component/>
//       ):
//         (
//           <Redirect to="#"/>
//         )
//     }
//       />
//     )
// }

// const ProtectedArticle = ({auth, component:Component, ...rest}) => {
  
//   return(
//     <Route
//       {...rest}
//         render = {() => auth?(
//           <Component/>
//           // console.log('Auth: Nope', auth)
//           ):
//         (
//           <Redirect to="/home"/>
          
//           // console.log('AuthSuccess: ', auth)
//         )
//       }
//     />
//   )
// }

export default Main;
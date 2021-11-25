import React from "react";
import Cookies from 'js-cookie';
import { HashRouter, Switch, Route, Redirect, Router, BrowserRouter, useHistory } from "react-router-dom";

import Home from "./LandingPage/Home";
import Profile from "./Profile/Profile";

import Search from "./Search/Search";
import SearchName from './Search/SearchName';

import AuthApi from './AuthApi'
import Disease from "./Disease/Disease";
import Dashboard from "./Dashboard/Dashboard.js";

import Blogpage from "./BlogPage/Blogpage";
import EditPost from './BlogPage/EditModal';
import BlogAllPost from './Dashboard/BlogAllPost'
import LoginInfo from './loginForm/LoginInfo'
import CommentsRev from './Dashboard/CommentsRev.js'
import ReviewComments from './Dashboard/ReviewComments.js'
import Results from './Dashboard/Results.js'
import PromoPaid from './Dashboard/PromoPaid.js'
import PromoAdmin from './Dashboard/PromoAdmin.js'
import ResetPass from './loginForm/ResetPass.js'
import Verify from './loginForm/Verify.js'
import EditSubscribe from './Dashboard/EditSubscribe'
import DeleteSubscribe from './Dashboard/DeleteSubscribe'
import List from '../List'
import Userprofile from "./Profile/Userprofile";
import history from "./history";
import MyArticle from './Profile/MyArtcle'
import ListArticle from './Profile/ListArticle'

function Main(props) {
const history = useHistory()

  // render() {
  const [auth, setAuth] = React.useState('not-logged-in');
  const readCookie = () => {
    // if(Cookies.get('acPerm')){
      var user = Cookies.get("acPerm")
      if(!user){
        return
      } else {
        user = user.split('|')[1]
      }
      console.log('userrrrrrrrrr: ', user)

      if(user >= 4 && user<10){             // user access for reviewer to admin previleges
        setAuth('admin')
        console.log('Admin:'+user)
      } else if(user >= 1 && user < 4){     // user access for normal users
        setAuth('normal-user')
        console.log('normal user: ', user)
      } else if(!user){                              // user access for not logged in users
        setAuth('not-logged-in')
        console.log('not logged in')
      }
    }
  const url = props.url;
  React.useEffect(() => {
    readCookie();
  }, [])

    return (
      <div>
        <AuthApi.Provider value={{auth, setAuth}}>
          <HashRouter history={history} basename={''}>
            <Routes url = {url}/>
          </HashRouter>
        </AuthApi.Provider>
      </div>
    );
  // }
}

const Routes = (props) => {
  const Auth = React.useContext(AuthApi)
  console.log(Auth.auth)
  return (
    <>
    <Switch>
      {/* Home Page */}
       <Route exact path="/" component={Home} />
       <Route exact path="/home" component={Home} />

      {/* Doctor search page */}
      <Route exact path="/search/:city" component={Search} /> 
      <Route exact path="/searchName/:name" component={SearchName} /> 
      <Route path="/search/:city/:name" component={Search} />

      {/* Article edit */}
      <ProtectedRoute auth={Auth.auth} path="/article/:id" component={EditPost}/>

      {/* Article creation page */}
      <ProtectedRoute auth={Auth.auth} path="/article" component={EditPost}/>

      {/* Dashboard pages */}
      <ProtectedRoute auth={Auth.auth} exact path="/dashboard" component={Dashboard} />
      <ProtectedRoute auth={Auth.auth} exact path="/dashboard/blogs" component={BlogAllPost} />
      <ProtectedRoute auth={Auth.auth} exact path="/dashboard/commentsrev" component={CommentsRev} />
      <ProtectedRoute auth={Auth.auth} exact path="/dashboard/reviewcomments" component={ReviewComments} />
      <ProtectedRoute auth={Auth.auth} exact path="/dashboard/results" component={Results} />
      <ProtectedRoute auth={Auth.auth} exact path="/dashboard/promopaid" component={PromoPaid} />
      <ProtectedRoute auth={Auth.auth} exact path="/dashboard/promoadmin" component={PromoAdmin} />
      <ProtectedRoute auth={Auth.auth} exact path="/dashboard/promoadmin" component={PromoAdmin} />

      {/* Cures list page */}
      <Route exact path="/cures" component={Blogpage}/>
      <Route path="/cures/:type" component={Blogpage}/>

      {/* Cure according to article_id*/}
      <ProtectedRoute auth={Auth.auth} exact path="/cure/:id" component={Disease}/>
      
      {/* Doctor profile page */}
      <ProtectedRoute auth={Auth.auth} exact path="/profile/:id" component={Profile} />
      <Route exact path="/profile/:id/edit" component={LoginInfo} />

      {/* Doctor invitation page and ask for UPNR number */}
      <Route exact path="/login/doctor" component={LoginInfo}/>

      {/* User's self profile */}
      <ProtectedRoute auth={Auth.auth} exact path="/user/profile" component={Userprofile} />
      
      {/* My articles */}
      <ProtectedRoute auth={Auth.auth} exact path="/myarticle" component={MyArticle} />
      <Route exact path="/ListArticle" component={ListArticle} />

      <Route exact path="/editsubscribe" component={EditSubscribe} />
      <Route exact path="/list" component={List} />
      <Route exact path="/deletesubscribe" component={DeleteSubscribe} />
      
      
      <Route exact path="/loginForm/ResetPass" component={ResetPass} />
      <Route exact path="/loginForm/verify" component={Verify} />
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
          <Redirect to={{pathname: '/home', search: '', state: {modalShow: true}}}/>
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

const ProtectedArticle = ({auth, component:Component, ...rest}) => {
  
  return(
    <Route
      {...rest}
        render = {() => auth?(
          <Component/>
          // console.log('Auth: Nope', auth)
          ):
        (
          <Redirect to="/home"/>
          
          // console.log('AuthSuccess: ', auth)
        )
      }
    />
  )
}

export default Main;
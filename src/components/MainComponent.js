import React from "react";
import Cookies from 'js-cookie';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./LandingPage/Home";
import Sticky from "./LandingPage/Sticky"
import Profile from "./Profile/Profile";

import Search from "./Search/Search";
import SearchName from './Search/SearchName';

// import Modal from './Modal';
import AuthApi from './AuthApi'
import Disease from "./Disease/Disease";
import Article 

from "./Article/Article.js";
import Dashboard from "./Dashboard/Dashboard.js";
import LoginPage from "./login";
import SignIn from "./Article/SignIn";
import Blogpage from "./BlogPage/Blogpage";
import EditPost from './BlogPage/EditModal';
import BlogAllPost from './Dashboard/BlogAllPost'
import LoginInfo from './loginForm/LoginInfo'
import FormSignup from "./loginForm/FormSignup";
import Comment from './Comment'
import CommentsRev from './Dashboard/CommentsRev.js'
import ReviewComments from './Dashboard/ReviewComments.js'
import Results from './Dashboard/Results.js'
import PromoPaid from './Dashboard/PromoPaid.js'
import PromoAdmin from './Dashboard/PromoAdmin.js'
import ResetPass from './loginForm/ResetPass.js'
import Promo from "./Dashboard/Promo/CreatePromo";
import Verify from './loginForm/Verify.js'
import Subscribe from './Dashboard/Subscribe.js'
import Subs from './Dashboard/Subs.js'
import EditSubscribe from './Dashboard/EditSubscribe'
import { now } from "jquery";


// import Blogs from './Disease/Disease'

function Main(props) {
  // render() {
  const [auth, setAuth] = React.useState(true);
  const readCookie = () => {
    // if(Cookies.get('acPerm')){
      const user = Cookies.get("acPerm")
      // const userAccess = user.split('|')[1]
      if(user){
        setAuth(false)
        console.log('USERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR:'+user)
      }
  }
  const url = props.url;
  React.useEffect(() => {
    readCookie();
  }, [])

    return (
      <div>
        <AuthApi.Provider value={{auth, setAuth}}>
          <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
            <Routes url = {url}/>
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
       <Route exact path="/blog/:id" component={Disease}/>
          <Route exact path="/home" component={Home} />
          <Route exact path="/search/:city" component={Search} /> 
          <Route exact path="/searchName/:name" component={SearchName} /> 
          <Route path="/search/:city/:name" component={Search} />
          {/* <Route path="/search/:city/:name" component={Search} /> */}
          <Route path="/article/:id" component={EditPost}/>
          <Route path="/article" component={EditPost}/>
          <Route path="/edit" auth={Auth.auth} component={Article} />
          <Route exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/sign" component={SignIn} />
          <Route exact path="/blogs" component={Blogpage}/>
          <Route exact path="/login/doctor" component={LoginInfo}/>
          <Route path="/blogs/:type" component={Blogpage}/>
          {/* <Route exact path="/blogs/:id" component={Blogs}/> */}
      <Route exact path="/profile/:id" component={Profile} />
      <Route exact path="/profile/:id/edit" component={LoginInfo} />
      <Route exact path="/dashboard/blogs" component={BlogAllPost} />
      <Route exact path="/comment" component={Comment} />
      <Route exact path="/dashboard/commentsrev" component={CommentsRev} />
      <Route exact path="/dashboard/reviewcomments" component={ReviewComments} />
      <Route exact path="/dashboard/results" component={Results} />
      <Route exact path="/dashboard/promopaid" component={PromoPaid} />
      <Route exact path="/dashboard/promoadmin" component={PromoAdmin} />
      <Route exact path="/dashboard/promoadmin" component={PromoAdmin} />
      <Route exact path="/landingPage/sticky" component={Sticky} />
      <Route exact path="/subscribe" component={Subscribe} />
      <Route exact path="/subs" component={Subs} />
      <Route exact path="/editsubscribe" component={EditSubscribe} />

    
      <Route exact path="/loginForm/ResetPass" component={ResetPass} />
      <Route exact path="/loginForm/verify" component={Verify} />
      <Route exact path='/loginForm/FormSignup' component={FormSignup}/>
     
      
      {/* <ProtectedArticle path="/article/:id" component={EditPost} auth={Auth.auth} /> */}
      
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
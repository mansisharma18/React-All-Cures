import React from 'react';
// import logo from './logo.svg';
// import 'bootstrap/dist/css/bootstrap.min.css';
import $ from'jquery';
import Popper from 'popper.js';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';
// import './css/main.css';
import './css/animate.css';
import './css/responsive.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './css/icomoon/style.css';
import Home from './components/LandingPage/Home';

import OwlDemo from './components/OwlDemo';  
// import OwlDemo from './Owldemo' 

function App() {
  return (
    <div>
      <Home/>
      {/* <OwlDemo></OwlDemo> */}
    </div>
  );
}

export default App;

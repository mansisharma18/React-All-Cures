// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import $ from'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.bundle';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/free-brands-svg-icons";
// import GA4React, { useGA4React } from "ga-4-react";

// const ga4react = new GA4React("G-1JXXXXX");

// function MyApp() {
//   const ga = useGA4React();
//   console.log(ga);

//   return <div className="App">hi!</div>;
// }
// (async () => {
//   await ga4react.initialize()
//   .then(res => console.log("Analytics Success."))
// .catch(err => console.log("Analytics Failure."))
// .finally(() => {
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// });
// })();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

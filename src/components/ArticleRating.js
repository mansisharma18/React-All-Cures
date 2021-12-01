import axios from "axios";
import React, { useState } from 'react';
// import "./styles.css";
import ReactStars from "react-rating-stars-component";
import { Alert, Form } from 'react-bootstrap';
import Comment from "../components/Comment";
import Header from '../components/Header/Header'
import { backendHost } from '../api-config';
import Cookies from 'js-cookie';


export default function ArticleRating(props) {
  console.log(props)
  const acPerm = Cookies.get("acPerm")

  const [ratingValue, setRatingValue] = React.useState([])
  const [showValue, setShowValue] = React.useState([])
  const [submitAlert, setAlert] = useState(false)
  const postRating = (rating, docid) => {

    axios.post(`${backendHost}/DoctorRatingActionController?ratingVal=${rating}&ratedbyid=${Cookies.get("acPerm").split('|')[0]}&ratedbytype=${Cookies.get("acPerm").split('|')[1]}&targetid=${props.article_id}&targetTypeid=2&cmd=rateAsset`)
    // .then(res => console.log(res)
    .then(res => {
      setAlert(true)
    
      setTimeout(() => {
          setAlert(false)
      }, 4000);
  })
  .catch(res => console.log(res))
    
    
  }

  

  
const thirdExample = {
  size: 40,
  count: 5,
  isHalf: false,
  value: 0,
  color: "yellow",
  activeColor: "orange",
  // filledIcon:"orange",
  onChange: newValue => {
    setRatingValue(newValue)
    
    postRating(newValue)
    console.log(`Example 3: new value is ${newValue}`);
  }
};



  return (
    <div className="App">
      
    
      <ReactStars {...thirdExample} />
      {
      submitAlert?
          <Alert variant="success" className="h6 mx-3">You rate this cure successfully!!</Alert>
          : null
  }
  
    </div>
  );
}

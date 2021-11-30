import axios from "axios";
import React, { useState } from 'react';
// import "./styles.css";
import ReactStars from "react-rating-stars-component";
import { Alert } from 'react-bootstrap';
import { backendHost } from '../api-config';
import Cookies from 'js-cookie';


export default function ArticleRating(props) {

  const [ratingValue, setRatingValue] = React.useState([])
  const [submitAlert, setAlert] = useState(false)
  const postRating = (rating, docid) => {

    axios.post(`${backendHost}/DoctorRatingActionController?ratingVal=${rating}&ratedbyid=${Cookies.get("acPerm").split('|')[0]}&ratedbytype=${Cookies.get("acPerm").split('|')[1]}&targetid=${props.article_id}&targetTypeid=1&cmd=rateAsset`)
    .then(res => {
      setAlert(true)
    
      setTimeout(() => {
          setAlert(false)
      }, 4000);
  })
  .catch(res => console.log(res))
    
    
  }

  // const getRating = () => {

  //   axios.get(`${backendHost}/rating/target/23/targettype/1/avg`)
  //   .then(res => {
  //     console.log(res.data[0].ratingVal)
  //     setRatingValue(res.data)
  //   })
  //   .catch(err => console.log(err))
  // }

  // React.useEffect(() => {
  //   getRating()
  
  // },[])

  
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

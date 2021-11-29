import axios from "axios";
import React, { useState } from 'react';
// import "./styles.css";
import ReactStars from "react-rating-stars-component";
import { Alert } from 'react-bootstrap';
import { backendHost } from '../api-config';
import Cookies from 'js-cookie';


export default function Rating(props) {

  const [ratingValue, setRatingValue] = React.useState([])
  const [submitAlert, setAlert] = useState(false)
  const postRating = (rating, docid) => {

    axios.post(`${backendHost}/DoctorRatingActionController?ratingVal=${rating}&ratedbyid=${Cookies.get("acPerm").split('|')[0]}&ratedbytype=${Cookies.get("acPerm").split('|')[1]}&targetid=${props.docid}&targetTypeid=1&cmd=rateAsset`)
    // .then(res => console.log(res)
    .then(res => {
      setAlert(true)
    
      setTimeout(() => {
          setAlert(false)
      }, 4000);
  })
  .catch(res => console.log(res))
    
    
  }


  // const getRating = () => {

  //   axios.get(`${backendHost}/rating/target/24/targettype/1/avg`)
  //   .then(res => {
  //     console.log(res.data[1].ratingVal)
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
  value:0,
  color: "yellow",
  activeColor: "orange",
  // filledIcon:"orange",
  onChange: newValue => {
    setRatingValue(newValue)
    // getRating(newValue)
    postRating(newValue)
    console.log(`Example 3: new value is ${newValue}`);
  }
};



  return (
    <div className="App">
      
    
      <ReactStars {...thirdExample} />
      

      {
      submitAlert?
          <Alert variant="success" className="h6 mx-3">You rate this doctor successfully!!</Alert>
          : null
  }
  
    </div>
  );
}

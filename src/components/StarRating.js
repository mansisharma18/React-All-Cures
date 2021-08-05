import axios from "axios";
import React from "react";
// import "./styles.css";
import ReactStars from "react-rating-stars-component";

// const firstExample = {
//   size: 30,
//   value: 2.5,
//   edit: false
// };

// const secondExample = {
//   size: 50,
//   count: 10,
//   color: "black",
//   activeColor: "red",
//   value: 7.5,
//   a11y: true,
//   isHalf: true,
//   emptyIcon: <i className="far fa-star" />,
//   halfIcon: <i className="fa fa-star-half-alt" />,
//   filledIcon: <i className="fa fa-star" />,
//   onChange: newValue => {
//     console.log(`Example 2: new value is ${newValue}`);
//   }
// };


// const fourthExample = {
//   size: 60,
//   isHalf: true,
//   char: "",
//   value: 3.5,
//   onChange: newValue => {
//     console.log(`Example 4: new value is ${newValue}`);
//   }
// };

export default function Rating() {


  const [ratingValue, setRatingValue] = React.useState(null)
  const postRating = (rating) => {

    axios.post(`/DoctorRatingActionController?ratingVal=${rating}&comments='another rating'&ratedbyid=1&ratedbytype=1&targetid=1&targetTypeid=1&cmd=rateAsset`)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  const getRating = () => {

    axios.get(`/rating/target/1/targettype/1`)
    .then(res => {
      console.log(res)
      setRatingValue(res.data)
    })
    .catch(err => console.log(err))
  }

  React.useEffect(() => {
    getRating()
  },[])

  
const thirdExample = {
  size: 40,
  count: 5,
  isHalf: false,
  value: ratingValue,
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
    </div>
  );
}

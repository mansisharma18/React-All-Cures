import React from "react";
// import "./styles.css";
import ReactStars from "react-rating-stars-component";

const firstExample = {
  size: 30,
  value: 2.5,
  edit: false
};

const secondExample = {
  size: 50,
  count: 10,
  color: "black",
  activeColor: "red",
  value: 7.5,
  a11y: true,
  isHalf: true,
  emptyIcon: <i className="far fa-star" />,
  halfIcon: <i className="fa fa-star-half-alt" />,
  filledIcon: <i className="fa fa-star" />,
  onChange: newValue => {
    console.log(`Example 2: new value is ${newValue}`);
  }
};

const thirdExample = {
  size: 40,
  count: 5,
  isHalf: false,
  value: 4,
  color: "yellow",
  activeColor: "orange",
  onChange: newValue => {
    console.log(`Example 3: new value is ${newValue}`);
  }
};

const fourthExample = {
  size: 60,
  isHalf: true,
  char: "",
  value: 3.5,
  onChange: newValue => {
    console.log(`Example 4: new value is ${newValue}`);
  }
};

export default function Rating() {
  return (
    <div className="App">
      
      <ReactStars {...thirdExample} />
    </div>
  );
}

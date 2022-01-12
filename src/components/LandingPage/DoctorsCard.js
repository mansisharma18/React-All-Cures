import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const DoctorsCard = ({rowno, firstName, lastName, primary_spl, hospital_affliated, state, country_code}) => {
   const [imageExists, setImageExists] = useState(false)
   const checkIfImageExits = (imageUrl) => {
      fetch(imageUrl, { method: 'HEAD' })
      .then(res => {
         if (res.ok) {
               setImageExists(true)
         } else {
            setImageExists(false)
         }
      }).catch(err => null);
   }

   useEffect(() => {
      checkIfImageExits(`https://all-cures.com:444/cures_articleimages/doctors/${rowno}.png`)
   }, [])
    return(
        <>
         <div className="item" key={rowno}>
    <div className="item-img">
       {/* <img src={Special2} alt="special-img"/> */}
       

       {
         imageExists?
           <img src={`https://all-cures.com:444/cures_articleimages/doctors/${rowno}.png`} />
           :  <i className="fas fa-user-md fa-10x"></i>
       }
    </div>
    {/* <div className="rating">
       <span className="icon-star-1"></span>
       <p>4</p>
    </div> */}
    <div className="sider-contain">
       <div className="slider-heading">
          <h2>Dr. {firstName} {lastName}</h2>
          <p>{primary_spl}</p>
          <h5 className="text-center"id="head5">{hospital_affliated} {state} {country_code}</h5>
       </div>
       <Link to={ `/profile/${rowno}` } className="appointmentBtn allBtn" id="visitDoc">Visit Profile</Link>
    </div>
 </div>
        </>
    )
}

export default DoctorsCard;
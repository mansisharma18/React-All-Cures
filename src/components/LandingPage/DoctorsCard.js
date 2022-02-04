import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const DoctorsCard = ({rowno, firstName, lastName, primary_spl, hospital_affliated, state, country_code}) => {
   const [imageExists, setImageExists] = useState(false)
   
   const checkIfImageExits = (imageUrl) => {
      fetch(imageUrl, { method: 'HEAD', mode: 'no-cors' })
      .then(res => {
         if (res.ok) {
               setImageExists(true)
         } else {
            setImageExists(false)
         }
      }).catch(err => null);
   }

   const onError = (e) => {
      e.target.parentElement.innerHTML = `<i class="fas fa-user-md fa-10x"></i>`
   }
   
   useEffect(() => {
      checkIfImageExits(`https://all-cures.com:444/cures_articleimages/doctors/${rowno}.png`)
   }, [])
    return(
        <>
         <div className="item" key={rowno}>
    <div className="item-img">
    {/* <object data="avatar.jpg" type="image/jpg"> */}
      <img src={`https://all-cures.com:444/cures_articleimages/doctors/${rowno}.png`} 
      onError={(e) => onError(e)}/>
      {/* </object> */}
    </div>
    <div className="sider-contain">
       <div className="slider-heading">
          <h2>Dr. {firstName} {lastName}</h2>
          <p>{primary_spl}</p>
          <h5 className="text-center">{hospital_affliated} {state} {country_code}</h5>
       </div>
       <Link to={ `/profile/${rowno}-${firstName}-${lastName}` } className="appointmentBtn allBtn" id="visitDoc">Visit Profile</Link>
    </div>
 </div>
        </>
    )
}

export default DoctorsCard;
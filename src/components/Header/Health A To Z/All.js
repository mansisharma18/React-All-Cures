import React, {useEffect,useState, useRef} from 'react';
import Header from '../Header';
import Footer from '../../Footer/Footer';
import { Alert, Form } from 'react-bootstrap';


import { Link } from 'react-router-dom'

function Disease() {

    const[diseaseList,setDiseaseList] = useState([])


   

   return(
    <div>
        <Header/>

                                      {/* <h1>DISEASEE STARTING FROM  A</h1> */}


                                      <div >
                <div className="container">
                <div >
                <div className="card-title h3  py-2 border-bottom" id='dis'> All Diseases </div> </div>
                       
    <div class="grid-container">
  <div class="grid-item">
      <Link to="/searchcategory/disease/1">
         Arthritis
         </Link></div>

      
         <div class="grid-item">
      <Link to="/searchcategory/disease/155">
      Skin Problems
         </Link></div>


         <div class="grid-item">
      <Link to="/searchcategory/disease/156">
      Acne
         </Link></div>
      


         <div class="grid-item">
      <Link to="/searchcategory/disease/164">
      Insomnia
         </Link></div>
      

       

         <div class="grid-item">
      <Link to="/searchcategory/disease/176">
      Healthy Lifestyle
         </Link></div>

       

         <div class="grid-item">
      <Link to="/searchcategory/disease/74">
      Diabetes
         </Link></div>

      

         <div class="grid-item">
      <Link to="/searchcategory/disease/50">
      Hypertension
         </Link></div>

         <div class="grid-item">
      <Link to="/searchcategory/disease/12">
      Blood Disorders
         </Link></div>

      

         <div class="grid-item">
      <Link to="/searchcategory/disease/160">
      Psoriasis
         </Link></div>

         <div class="grid-item">
      <Link to="/searchcategory/disease/137">
      Migraines Headaches
         </Link></div>

         <div class="grid-item">
      <Link to="/searchcategory/disease/87">
      Thyroid Disorders
         </Link></div>

     
</div>
                          </div></div>


                    
                   
               
{/* 
                <h1>END OF A</h1>

                <h1>sTART OF B</h1> */}
                

          
              
<Footer/>

    </div>
   );


}
export default Disease
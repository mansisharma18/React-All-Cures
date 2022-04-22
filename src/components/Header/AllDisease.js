import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import axios from 'axios';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom'
import A from './Health A To Z/A'

function Disease() {

    
   return(
    <div>
        <Header/>

                                      {/* <h1>DISEASEE STARTING FROM  A</h1> */}


        <div className="">
                <div className="container">
                    <h3>All Disease From A To Z</h3>
                    <div class="container mt-3">
  
 <br/>
  
</div>


                <div className="container">
                   
               
                        <div className="card-title h3  py-2 border-bottom" id='dis'> 
                        
                        <div class="container mt-3" >
                        <div class="btn-group btn-group-lg" >
                        
  <button type="button" class=" btn-lg" id='dis1'>ALL</button>

    <button type="button" class=" btn-lg" id='dis1'>A</button>
    <button type="button" class=" btn-lg" id='dis1'>B</button>
    <button type="button" class=" btn-lg" id='dis1'>C</button>
    <button type="button" class=" btn-lg" id='dis1'>D</button>
    <button type="button" class=" btn-lg" id='dis1'>E</button>
    <button type="button" class=" btn-lg" id='dis1'>F</button>
    <button type="button" class=" btn-lg" id='dis1'>G</button>
    <button type="button" class=" btn-lg" id='dis1'>H</button>
    <button type="button" class=" btn-lg" id='dis1'>I</button>
    <button type="button" class=" btn-lg" id='dis1'>J</button>
    <button type="button" class=" btn-lg" id='dis1'>K</button>
    <button type="button" class=" btn-lg" id='dis1'>L</button>
    
  </div><br/>
  <div class="btn-group btn-group-lg">

    
    <button type="button" class=" btn-lg" id='dis1'>M</button>
    <button type="button" class=" btn-lg" id='dis1'>N</button>
    <button type="button" class=" btn-lg" id='dis1'>O</button>
    <button type="button" class=" btn-lg" id='dis1'>P</button>
    <button type="button" class=" btn-lg" id='dis1'>Q</button>
    <button type="button" class=" btn-lg" id='dis1'>R</button>
    <button type="button" class=" btn-lg" id='dis1'>S</button>
    <button type="button" class=" btn-lg" id='dis1'>T</button>
    <button type="button" class=" btn-lg" id='dis1'>U</button>
    <button type="button" class=" btn-lg" id='dis1'>V</button>
    <button type="button" class=" btn-lg" id='dis1'>X</button>
    <button type="button" class=" btn-lg" id='dis1'>Y</button>
    <button type="button" class=" btn-lg" id='dis1'>Z</button>
  </div>
  
  
  </div>
                        
                        
                        </div>
                    
                             </div>  
                

              
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='disA'> Disease Starting From <b>"A"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5  col-md-6 text-right">Arthritis</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Ankylosing Spondylitis</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Anemia</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Alzheimer's Disease</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Autism</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Atrial Fibrillation</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right"> Allergies</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Addictions Substance</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right"> Asthma</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Athlete's Foot</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Anaphylaxis</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">ADHD - ADD</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Acne</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Abdominal Pain</div>
                        
                   
                    </Link>
                        </div>

                        
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Abuse topics</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Anxiety - Panic Disorder</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Abortion</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Acute Renal Failure</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right"> Appendicitis
                        
                        </div>
                        
                   
                    </Link>
                        </div>


                    </div>
                   
                       
                    </div>


                    </div>
                   
                </div>
{/* 
                <h1>END OF A</h1>

                <h1>sTART OF B</h1> */}
                

                

        <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='disB'> Disease Starting From <b>"B"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">Blood Disorders</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Bones and Joints</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right"> Bladder Cancer</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Brain and Nervous</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Brain Cancer</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Brain Tumors</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Breast Cancer</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Bipolar Disorder</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Back Pain</div>
                        
                   
                    </Link>
                        </div>
                      
                    </div>  </div> </div>  
                </div>

                {/* <h1>END OF LIST B</h1>
                <h1>START OF LIST C</h1> */}

                        

        <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"C"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">Cancer</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Chronic Fatigue </div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Carcinoid Tumors</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Cervical Cancer</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Colorectal Cancer</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Cardiovascular</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Celiac Disease</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Cholesterol Management</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Constipation</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Crohn's Disease </div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Cataracts</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Chicken Pox </div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Cold and Flu</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Cold </div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">COPD</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Cystic Fibrosis</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Canker Sores</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Carpal Tunnel Syndrome </div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Chronic Female Pelvic Pain</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Chronic Kidney Disease </div>
                        
                   
                    </Link>
                        </div>
                      
                    </div>  </div> </div>  
                </div>
            {/* END OF LIST C */}

            <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"D"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">Diabetes</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Diabetic Neuropathy</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Depression</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Depression Treatment-Resistant</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Dry Mouth</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Digestive Disorders</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Dupuytren's</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> DVT</div>
                        
                   
                    </Link>
                        </div>
                      
                      
                    </div>  </div> </div>  
                </div>

                {/* END OF D */}

                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"E"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">Ear Disorders</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Eating Disorders</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Eczema</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Endocrine and metabolic Diseases</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Endometriosis</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Epilepsy</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Erectile Dysfunction</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Essential Tremors</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Estrogen Replacement Therapy</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Eye Health</div>
                        
                   
                    </Link>
                        </div>
                      
                    </div>  </div> </div>  
                </div>

                {/* END OF LIST E */}

                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"F"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">Fibromyalgia</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">First Aid</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Flu</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Foot Problems</div>
                        
                   
                    </Link>
                        </div>
                        
                      
                    </div>  </div> </div>  
                </div>

                {/* END OF LIST F  */}
                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"G"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">Gallstones</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Genital Herpes</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Gestational Diabetes</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Gingivitis</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Gout</div>
                        
                   
                    </Link>
                        </div>
                        
                      
                    </div>  </div> </div>  
                </div>

                {/* END OF LIST G */}

                <div className="">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"H"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">Hair Loss</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Healthy Lifestyle</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Hearing Loss</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Heart Failure</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Heart Health</div>
                        
                   
                    </Link>
                        </div>
                        
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Heartburn - GERD</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Hemorrhoids</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Hep A</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Hep B</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Hep C</div>
                        
                   
                    </Link>
                        </div>
                        
  <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Hepatitis</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Hernia</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Herpes Cold Sores</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">HIV-AIDS</div>
                        
                   
                    </Link>
                        </div>
                        
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Hodgkin's Disease</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Hormonal Disorders</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">HPV-Genital Warts</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Hypertension</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Hypotension
                        
                        </div>
                        
                   
                    </Link>
                        </div>


                    </div>
                   
                       
                    </div>


                    </div>
                   
                </div>

                    {/* END OF LIST H */}


                    <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"I"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">  IBD</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Incontinence / OAB</div>
                        
                   
                    </Link>
                        </div>
                    
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">IBS</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Infection</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Infectious Diseases</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Infertility</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Injuries</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Insomnia</div>
                        
                   
                    </Link>
                        </div>
                      
                      
                    </div>  </div> </div>  
                </div>

                {/* END OF LIST I  */}
                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"K"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">  Kidney Cancer</div>
                        
                   
                    </Link>
                   



        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Kidney Disorders</div>
                        
                   
                    </Link>
                        </div>
                    
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Kidney Stones</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Knee Pain</div>
                        
                   
                    </Link>
                        </div>
                    
                    
                      
                      
                    </div>  </div> </div>  
                </div>

                {/* END OF LIST K */}

                
                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"L"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">Lactose intolerance</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Leukemia</div>
                        
                   
                    </Link>
                        </div>
                    
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Liver Disease</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Low Testerone</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Lung&Respiratory Health</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Lung Cancer</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Lupus</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Lyme Disease</div>
                        
                   
                    </Link>
                        </div>
                      
                      
                    </div>  </div> </div>  
                </div>
                {/* END OF LIST L */}

                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"M"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">Macular Degeneration</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Melanoma - Skin Cancer</div>
                        
                   
                    </Link>
                        </div>
                    
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Menopause</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Mental Health</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Metabolic Syndrome</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Migraines - Headaches</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Miscarriage</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Multiple Sclerosis</div>
                        
                   
                    </Link>
                        </div>
                      
                      
                    </div>  </div> </div>  
                </div>
                {/* END OF LIST M */}

                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"N"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">Narcolepsy</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Non-Hodgkin's Lymphoma</div>
                        
                   
                    </Link>
                        </div>
                    
                      
                      
                    </div>  </div> </div>  
                </div>
                {/* END OF LIST N */}

                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"O"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">Oral Cancer</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Oral Diseases</div>
                        
                   
                    </Link>
                        </div>
                    
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Osteoarthritis</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Osteoporosis</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Ovarian Cancer</div>
                        
                   
                    </Link>
                        </div>
                       
                    </div>  </div> </div>  
                </div>
{/* 
                END OF LIST O  */}

                


                    <div className="">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"P"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right"> Pain Management</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Pancreatic Cancer</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Parkinson's Disease</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Pelvic Inflammatory Disease</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Pink Eye - Conjunctivitis</div>
                        
                   
                    </Link>
                        </div>
                        
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">PMS</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Pneumonia</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left"> Polycystic Ovary Syndrome</div>
                        
                   
                </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Postpartum Depression</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Pregnancy Complications</div>
                        
                   
                    </Link>
                        </div>
                        
  <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Prostate Cancer</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Prostate Enlargement/BPH</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Psoriasis</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Psoriatic Arthritis</div>
                        
                   
                    </Link>
                        </div>


                    </div>
                   
                       
                    </div>


                    </div>
                   
                </div>
                {/* END OF LIST P */}

                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"R"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right"> Reproduction</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                       
                  <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Rheumatoid Arthritis</div>
                        
                   
                    </Link>
                        </div>
                    
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Restless Leg Syndrome (RLS)</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">
Rosacea</div>
                        
                   
                    </Link>
                        </div>
                       
                       
                    </div>  </div> </div>  
                </div>
                {/* END OF LIST R */}

                    
                <div className="">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"S"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">  Schizophrenia</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Sensitive topics</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Sexual Conditions</div>
                        <div className="col-md-6 rounded" id="ayurveda">
  </div>
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Sexual Health</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Shingles</div>
                        
                   
                    </Link>
                        </div>
                        
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Sinusitis</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Sjogren's Syndrome</div>
                        
                   
     
              </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Skin Problems</div>
                        
                   
                </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Sleep Apnea</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Sleep Disorders</div>
                        
                   
                    </Link>
                        </div>
                        
  <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Smoking Cessation</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Spinal Cord Disorders</div>
                        
                   
                    </Link>
                        </div>                                                                                
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">STDs</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Strep Throat</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Stroke</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Swine Flu </div>
                        
                   
                    </Link>
                        </div>


                    </div>
                   
                       
                    </div>


                    </div>
                   
                </div>

                {/* END OF LIST S */}

                
                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"T"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">Thrush
                        </div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Thyroid Disorders</div>
                        
                   
                    </Link>
                        </div>
                    
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Triglycerides</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Type 1 Diabetes</div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Type 2 Diabetes</div>
                        
                   
                    </Link>
                        </div>
                       
                    </div>  </div> </div>  
                </div>

                {/* END OF LIST T */}

                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"U"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">Ulcerative Colitis
                        </div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Urinary Disorders</div>
                        
                   
                    </Link>
                        </div>
                    
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Urinary Tract Infection</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Uterine Fibroids</div>
                        
                   
                    </Link>
                        </div>
                   
                       
                    </div>  </div> </div>  
                </div>
                {/* END OF LIST U  */}
                <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"V"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                        <Link to="/searchcategory/disease/1">
                        <div className="h5 col-md-6 text-right">Varicose Veins
                        </div>
                        
                   
                    </Link>
                        </div>
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Vascular Disease</div>
                        
                   
                    </Link>
                        </div>
                    
                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5 col-md-6 text-right">Vertigo</div>
                        
                   
                    </Link>
                        </div>

                        <div className="col-md-6 float-left">
                        <Link to="/searchmedicine/medicinetype/1">
                        <div className="h5  col-md-6 text-left">Vision Correction</div>
                        
                   
                    </Link>
                        </div>
                  
                       
                    </div>  </div> </div>  
                </div>
<Footer/>

    </div>
   );


}
export default Disease
import React, {useEffect,useState, useRef} from 'react';
import Header from '../Header';
import Footer from '../../Footer/Footer';

import { Link } from 'react-router-dom'

function Disease() {

    const[diseaseList,setDiseaseList] = useState([])


   

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
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"A"</b></div>
                    
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
                

          
              
<Footer/>

    </div>
   );


}
export default Disease
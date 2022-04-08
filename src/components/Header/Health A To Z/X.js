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
                    <div class="container mt-3">
  
 <br/>
  
</div>


                <div className="container">
                   
               
                        <div className="card-title h3  py-2 border-bottom" id='dis'> 
                        
                        <div class="container mt-3" >
                        <div class="btn-group btn-group-lg" >
                        <Link to="/alldisease"><button type="button" class=" btn-lg" id='dis1'>ALL</button></Link>

<Link to="/alldisease-A">  <button type="button" class=" btn-lg" id='dis1'>A</button></Link>
<Link to="/alldisease-B">  <button type="button" class=" btn-lg" id='dis1'>B</button></Link>
<Link to="/alldisease-C"> <button type="button" class=" btn-lg" id='dis1'>C</button></Link>
<Link to="/alldisease-D"> <button type="button" class=" btn-lg" id='dis1'>D</button></Link>
<Link to="/alldisease-E"> <button type="button" class=" btn-lg" id='dis1'>E</button></Link>
<Link to="/alldisease-F"> <button type="button" class=" btn-lg" id='dis1'>F</button></Link>
<Link to="/alldisease-G"><button type="button" class=" btn-lg" id='dis1'>G</button></Link>
<Link to="/alldisease-H"><button type="button" class=" btn-lg" id='dis1'>H</button></Link>
<Link to="/alldisease-I"><button type="button" class=" btn-lg" id='dis1'>I</button></Link>
<Link to="/alldisease-J"><button type="button" class=" btn-lg" id='dis1'>J</button></Link>
<Link to="/alldisease-K"><button type="button" class=" btn-lg" id='dis1'>K</button></Link>
<Link to="/alldisease-L"><button type="button" class=" btn-lg" id='dis1'>L</button></Link>
  
</div><br/>
<div class="btn-group btn-group-lg">

  
<Link to="/alldisease-M"><button type="button" class=" btn-lg" id='dis1'>M</button></Link>
<Link to="/alldisease-N"><button type="button" class=" btn-lg" id='dis1'>N</button></Link>
<Link to="/alldisease-O"><button type="button" class=" btn-lg" id='dis1'>O</button></Link>
<Link to="/alldisease-P"><button type="button" class=" btn-lg" id='dis1'>P</button></Link>
<Link to="/alldisease-Q"><button type="button" class=" btn-lg" id='dis1'>Q</button></Link>
<Link to="/alldisease-R"><button type="button" class=" btn-lg" id='dis1'>R</button></Link>
<Link to="/alldisease-S"><button type="button" class=" btn-lg" id='dis1'>S</button></Link>
<Link to="/alldisease-T"><button type="button" class=" btn-lg" id='dis1'>T</button></Link>
<Link to="/alldisease-U"><button type="button" class=" btn-lg" id='dis1'>U</button></Link>
<Link to="/alldisease-V"><button type="button" class=" btn-lg" id='dis1'>V</button></Link>
<Link to="/alldisease-X"><button type="button" class=" btn-lg" id='dis1'>X</button></Link>
<Link to="/alldisease-Y"><button type="button" class=" btn-lg" id='dis1'>Y</button></Link>
<Link to="/alldisease-Z"><button type="button" class=" btn-lg" id='dis1'>Z</button></Link>
</div>
  
  
  </div>
                        
                        
                        </div>
                    
                             </div>  
                
                             <div className="">
                <div className="container">
                   
                <div className="card my-3">
                        <div className="card-title h3  py-2 border-bottom" id='dis'> Disease Starting From <b>"X"</b></div>
                    
                            <div >
                        <div className="col-md-6 float-left">
                      <h4>There Are No Diseases Beginning With This Letter</h4>
                   



        </div>
                       
                    </div>  </div> </div>  
                </div>
                    </div>
                   
                </div>

                

          
              
<Footer/>

    </div>
   );


}
export default Disease
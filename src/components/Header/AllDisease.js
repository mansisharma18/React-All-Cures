import React, {useEffect,useState, useRef} from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { backendHost } from '../../api-config';


function Disease() {

    const[diseaseList,setDiseaseList] = useState([])


    const getDisease = () => {
        axios.get(`${backendHost}/article/all/table/disease_condition`)
        .then(res => {
            
            setDiseaseList(res.data)
        })
        .catch(err => 
            console.log(err)
        )
    }

    

    useEffect(() => {
        getDisease()  
        
    
   }, []) 
   return(

    <div className="card my-3">
    <div className="card-title h3 text-center py-2 border-bottom">All Disease</div>
    <form >
        <div className="row m-4">
            <div className='col-8'>

        {diseaseList.map((lan) => {
                           
                         
                           if(lan[7]){
                               return (
                                   <option  value={lan[0]}>&nbsp;&nbsp;{lan[3]}</option>
                               )
                           }else{
                               return (
                                   <option style={{ fontWeight: 'bold' }} value={lan[0]}>{lan[3]}</option>
                               )
                           }
                       })}

 
    </div>
    </div>
 

    </form>
</div>


   );


}
export default Disease
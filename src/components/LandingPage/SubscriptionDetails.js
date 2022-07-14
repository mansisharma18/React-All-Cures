import React, {useState}from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { backendHost } from '../../api-config';
//Importing bootstrap and other modules


class SubscriptionDetails extends React.Component {
  
	// Constructor
	constructor(props) {
		super(props);

		this.state = {
			items: [],
			DataisLoaded: false,
            
		};
	}
  componentDidMount() {
    axios.get(`${backendHost}/subscription/get`)
     // .then(res => res.json())
    .then(res => {

     this.setState({
       items: res.data,
       DataisLoaded: true
     });
   })
}
render(){
  const { DataisLoaded, items } = this.state;
  return(
    <div className="maincontainer">
          
    <section>
       <div class="container py-5">

         
         <header class="text-center mb-5">
           <div class="row">
             <div class="col-lg-8 mx-auto">
               <h2>Subscribe and get access to unlimited articles</h2>
               <h5>sorry! you have accessed all the free articles. Want to read more please subscribe</h5>
             </div>
           </div>
         </header>
        


        
         <div class="row">
         {
     items.map((item) => (
           <div class="col-4  mb-5  subscription my-3">
             <div class="bg-white  p-1 rounded-lg shadow">
             
             <h1 class="h3 text-center text-uppercase  mb-2 my-3">{item.subscription_details}</h1>
               <h4 class="h4 text-center font-weight-bold">{item.detailing}</h4>
     
               <div class="custom-separator my-2 mx-auto bg-primary"></div>

<ul class="list-unstyled my-2 text-small text-left font-weight-normal">
  <li class="mb-3">
    <i class="  mr-3 text-primary"></i>{item.subscription_id}</li>
  
</ul>






    
 
                   <a href="#" class="btn btn-primary btn-sub btn-block p-2 shadow rounded-pill">Buy now</a>
                
               
              
             </div>
           </div>
          
        
        
          ))
        }  </div>
         
       </div>
       
     </section>

   </div>
  );
}
}
export default SubscriptionDetails;


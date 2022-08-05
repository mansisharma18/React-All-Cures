import React,{useState, useEffect} from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { backendHost } from '../../api-config';
import Footer from '../Footer/Footer';

import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';

const SubscriptionDetails = (props) => {
  const [items, setItems] = useState([])
  const [Loading, setLoading] = useState()
  const [amount, setAmount] = useState()
  const [Id, setId] = useState()
 function subdetails(){
  axios.get(`${backendHost}/subscription/get`)



  .then((res) => {
    setItems(res.data)
   
})
  .catch(err => null)

  // .then(res => res.json())
 
 }
 useEffect(() => {
  subdetails()
  
}, [])
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

 function displayRazorpay(priceId) {
  
  setLoading(true);
axios.post(`${backendHost}/subscription/create_order`, {
   amount:priceId,
  id:Id
  })
  .then(res => {
   setId(JSON.parse(res.data).id); 
   callOptions(); 
   //setAmount(res.data)
  })
  
  
    .catch(err => {
      console.log(err);
    });
    
function callOptions(){

var options = {
  key: "rzp_test_GgDGBdRu7fT3hC",
  currency: "INR",
  amount: (priceId*100),//.toString(),
  order_id:Id.toString,
  name: "Subscription",
  description: "Thank you for nothing. Please give us some money",
  image: "http://localhost:1337/logo.svg",
  handler: function (response) {
    // alert(response.razorpay_payment_id);
    // alert(response.razorpay_order_id);
    // alert(response.razorpay_signature);

    alert("Transaction successful");
  },
  prefill: {
    name: "",
    email: "",
    phone_number: "",
  },
};
const paymentObject = new window.Razorpay(options);
    paymentObject.open();
 }
}


  
  return (
   
    <>
    
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
       


       
        <div class="row mainsub">
        {
    items.map((item) => (
          <div class="col-md-3   mb-5  subscription my-3">
            <div class="bg-white  p-1 rounded-lg shadow">
            <h1 class="h3 text-center text-uppercase  mb-2 my-3">{item.plan}</h1>
            <h1 class="h3 text-center text-uppercase  mb-2 my-3">{item.subscription_details}</h1>
              <h4 class="h4 text-center font-weight-bold">{item.detailing}</h4>
    
              <div class="custom-separator my-2 mx-auto bg-primary"></div>

 <a href="#" onClick={() =>displayRazorpay(item.price_id)}  class="btn btn-primary btn-sub btn-block p-2 shadow rounded-pill">Buy now</a>
               
              
             
            </div>
          </div>
         
       
       
         ))
       }  </div>
        
      </div>
      
    </section>
<Footer/>
  </div>
  </>
  );
}

export default SubscriptionDetails;

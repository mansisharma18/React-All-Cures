import React,{useState, useEffect} from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { Route } from "react-router-dom";
import { backendHost } from '../../api-config';
import Footer from '../Footer/Footer';
import Doct from "../../assets/img/doct.png";
import PhoneInput from 'react-phone-number-input';
import {userId} from "../UserId";
import { userAccess } from "../UserAccess";
import {useParams} from 'react-router-dom';
import Heart from"../../assets/img/heart.png";
import { faSortAmountDown } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";
import Test from './test'
const SubscriptionDetails = (props) => {
  const [items, setItems] = useState([])
  const [Loading, setLoading] = useState()
  const [amount, setAmount] = useState()
  const [subid, setSubid] = useState()
  const [showAlert, setShowAlert] = useState(false)
  const [alertMsg, setAlertMsg] = useState(true)
  const [afterSubmitLoad, setafterSubmitLoad] = useState(false)
  const history = useHistory();
  const [auth, setAuth] = React.useState('not-logged-in');
  const [authLoaded, setAuthLoaded] = React.useState(false);
  const[modalShow,setmodalShow]=useState(false)
  const[value,setValue]=useState()
  const[path,setPath]=useState()
  const[afterSubmitted,setafterSubmitted]=useState(false)
  const[disease, setDisease]=useState()
  const[cures, setCures]=useState()
  function Alert(msg){
    setShowAlert(true)
    setAlertMsg(msg)
    setTimeout(() => {
       setShowAlert(false)
    }, 1000);
  }
 


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

function postSubscribtion() {
  var phoneNumber = value.split('+')[1]
  var countryCodeLength = phoneNumber.length % 10
  var countryCode = phoneNumber.slice(0, countryCodeLength)
  var StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, '')
   if(phoneNumber){
     
    setafterSubmitLoad(true)
    
    axios.post(`${backendHost}/users/subscribe/${StringValue}`, {
    "nl_subscription_disease_id": disease.join(','),
    "nl_sub_type":1,
    "nl_subscription_cures_id":cures.join(','),
    "country_code": countryCode,
    })
      .then(res => {
      
          setafterSubmitLoad(false)
      
       if(res.data === 1){
          Alert('You have successfully subscribed to our Newsletter')
       }
       else {
          Alert('Some error occured! Please try again later.')
       }
      })
      .catch(err => {
     
          setafterSubmitLoad(false)
      
       Alert('Some error occured! Please try again later.')
       
 
    })
   } else {
      Alert('Please enter a valid number!')
   }
}

 

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
function showForm(action) {
  setmodalShow(action)
}
 function displayRazorpay(priceId,subscription_id,userId,path, ...rest) {
  
  
  
   
  
  setLoading(true);
axios.post(`${backendHost}/subscription/create_order`, {
   amount:priceId,
   
  })
  
  
  .then(res => { 
    if (res.data) {
      console.log('orderID', JSON.parse(res.data).id);

      postData(
        JSON.parse(res.data).amount,
        JSON.parse(res.data).id,
        JSON.parse(res.data).status,userId, subscription_id
       
      );
      callOptions(
        JSON.parse(res.data).amount,
        JSON.parse(res.data).currency,
        JSON.parse(res.data).id,
        id
      );
     

      setLoading(false);
    }
  })
    .catch(err => {
      console.log(err);
    });
  
  
 

 
    function postData(amount, orderId, statusId, userId,subscription_id) {
      axios
        .post(`${backendHost}/subscription/order/userid/${userId}/subsid/${subscription_id}`, {
          amount: amount.toString(),
          order_id: orderId.toString(),
          razorpay_status: statusId.toString(),
         
                            
        })
        .then(res => {
          console.log('order', res.data);
        })
        .catch(err => err);
    }

    function postUpdate(paymentId, orderID, subscription_id) {
      axios
        .put(`${backendHost}/subscription/updatepayment/"${orderID}"`, {
          payment_id: paymentId,
          razorpay_status: "paid",
          status: 1,
          subscriptionId:subscription_id

        })
        .then(res => {
        console.log(res)
        })
        .catch(err => err);
    }


function callOptions(amount,currency,orderId){
  
var options = {
  key: "rzp_test_GgDGBdRu7fT3hC",
  currency: currency,
  amount: amount,//.toString(),
  order_id:orderId,
  article_id:id,
  name: "Subscription",
  description: "Thank you",
 
  image: "",
  handler: function (response) {

    var redirect_url="";
    // alert(response.razorpay_payment_id);
    // alert(response.razorpay_order_id);
    // alert(response.razorpay_signature);
    if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
      Alert('Try Again!')
      redirect_url = `/home`;
    } else {
      Alert('Your Transaction is successfully!')
      redirect_url = `/cure/${id}`;
    }
        console.log(response)
    postUpdate(
      `${response.razorpay_payment_id}`,
      `${response.razorpay_order_id}`,
      `${response.subscription_id}`
      
    );
    window.location.href = redirect_url;
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
var id = props.match.params.article_id
  return (
    <div>
            { showAlert &&
            <div className="alert alert-success pop-up border-bottom">
              <div className="h5 mb-0 text-center">{alertMsg}</div>
              <div className="timer"></div>
            </div>
        }
        {
                afterSubmitLoad &&
                <div className="loader main on-submit-loading">
                    <i className="fa fa-spinner fa-spin fa-10x" />
                </div>
            }
        
    <>
       <Header/>
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
      
          <div class="col-3   mb-5  subscription my-3">
            <div class="bg-white  p-1 rounded-lg shadow">

            <h1 class="h3 text-center text-uppercase  mb-2 my-3">{item.plan}</h1>
            <h1 class="h3 text-center text-uppercase  mb-2 my-3">{item.subscription_details}</h1>
              <h4 class="h4 text-center font-weight-bold">{item.detailing}</h4>
    
              <div class="custom-separator my-2 mx-auto bg-primary"></div>

              <div>

              {


                              userAccess?
                              <a href="#" onClick={() =>
                                 {displayRazorpay(item.price_id,item.subscription_id,userId)}} 
                                  class="btn btn-primary btn-sub btn-block p-2 shadow rounded-pill">Buy now</a>

                              :<a href="#" onClick={() => {showForm(true)}}  
                              class="btn btn-primary btn-sub btn-block p-2 shadow rounded-pill">Buy now</a>

                           }   
              </div>

                
              
             
            </div>
          </div>
         
       
       
         ))
       }  </div>
        
      </div>
      
    </section>

    <section className="megaSearch">
                  
                  <div className="container">
                  
                     <div className="row">
                     <Test
                        show={modalShow}
                        path={path}
                        onHide={() =>showForm(false)}
                     />
                     </div></div></section>
    <div className="modal fade bd-example-modal-lg" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
    <div className="modal-header">
        
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    <section className="appStore" >
         <div className="container">
            <div className="row">
               <div className="appStoreBg clearfix" style={{display:"flex",width: "100%",flexWrap: 'wrap'}}>
                  <div className="col-md-6 col-sm-6 col-sx-12">
                     <div className="innerapp">
                        <div className="doc-img">
                           <img src={Doct} alt="doct"/>
                        </div>
                       
                     </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-sx-12 bg-white subs-hero-2">
                     <div className="subscribe">                    
                        <h1 className="text-dark">All Cures</h1>
                        <div className="h5">Sign up for our free <span>All Cures</span> Daily Newsletter</div><br/>
                        <div className="h5">Get <span>doctor-approved</span> health tips, news, and more</div>
                        <div className="form-group relative">
                           <div className="aaa">
                              <PhoneInput
                                 placeholder="Enter phone number"
                                 value={value}
                                 defaultCountry='IN'
                              
                                 onChange={(e) => setValue(e.target.value)} 
                              />                              
                           </div>
                           <div>
                              <button className="bcolor rounded py-2" onClick={( ) => {postSubscribtion()}}>
                                 Submit
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
        
      </section>
    </div>
  </div>
</div>
<Footer/>
  </div>
  </>
  </div>
  );
}

export default SubscriptionDetails;

import React, {useState}from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
//Importing bootstrap and other modules
export default function SubscriptionDetails() {
  const [style, setStyle] = useState({display: 'none'});
 
   
    return (
    //  <Header/>
    

      <div className="maincontainer">
                  <Header />

          
       <section>
          <div class="container py-5">

            
            <header class="text-center mb-5">
              <div class="row">
                <div class="col-lg-8 mx-auto">
                  <h2>Subscribe and get access to unlimited articles</h2><br/>
                  <h5>sorry! you have accessed all the free articles. Want to read more please subscribe</h5>
                </div>
              </div>
            </header>
           



            <div class="row text-center  align-items-end subdetails">
             
              <div class="col-lg-3  mb-5 mb-lg-0 subscription">
                <div class="bg-white  p-1 rounded-lg shadow"
                onMouseEnter={e => {
                  setStyle({display: 'block'});
              }}
              onMouseLeave={e => {
                  setStyle({display: 'none'})
              }}>
                  <h1 class="h3 text-uppercase text-center mb-2 my-3">Basic</h1>
                  <h4 class="h4 text-center font-weight-bold">500 INR</h4>

                  <div class="custom-separator my-2 mx-auto bg-primary"></div>

                  <ul class="list-unstyled my-2 text-small text-left">
                    <li class="mb-3">
                      <i class="  mr-3 text-primary"></i>5 articles/month</li>
                    <li class="mb-3">
                      <i class="  mr-3 text-primary"></i> 2 doctors consultation</li>
                      <li class="mb-3">
                      <i class="  mr-3 text-primary"></i> other info</li>
                    <li class="mb-3">
                      <i class="  mr-3 text-primary"></i> more info</li>
                      <a href="#" class="btn btn-primary btn-sub btn-block p-2 shadow rounded-pill">Buy now</a>
                   
                  </ul>
                 
                </div>
              </div>
             
              <div class="col-lg-3 subscription mb-5 mb-lg-0">
                <div class="bg-white  p-1 rounded-lg shadow">
                  <h1 class="h3 text-uppercase text-center mb-2 my-3">Standard</h1>
                  <h4 class="h4 text-center font-weight-bold">1000 INR</h4>

                  <div class="custom-separator my-2 mx-auto bg-primary"></div>

                  <ul class="list-unstyled my-2 text-small text-left font-weight-normal">
                    <li class="mb-3">
                      <i class="  mr-3 text-primary"></i> 5 asrticles/month</li>
                    <li class="mb-3">
                      <i class="  mr-3 text-primary"></i> 2 doctors consultation</li>
                    <li class="mb-3">
                      <i class="  mr-3 text-primary"></i> other info</li>
                    <li class="mb-3">
                      <i class="  mr-3 text-primary text-right"></i> more info</li>
                   
                  </ul>
                  <a href="#" class="btn btn-primary btn-block btn-sub p-2 shadow rounded-pill">Buy now</a>
                </div>
              </div>
             
              <div class="col-lg-3  subscription  ">
                <div class="bg-white   p-1 rounded-lg shadow">
                  <h1 class="h3 text-center text-uppercase  mb-2 my-3">Ultimate</h1>
                  <h4 class="h4 text-center font-weight-bold">2000 INR</h4>

                  <div class="custom-separator my-2 mx-auto bg-primary"></div>

                  <ul class="list-unstyled my-2 text-small text-left font-weight-normal">
                    <li class="mb-3">
                      <i class="  mr-3 text-primary"></i>5 article/month</li>
                    <li class="mb-3">
                      <i class="  mr-3 text-primary"></i>2 doctor consultaion</li>
                      <li class="mb-3">
                      <i class="  mr-3 text-primary"></i> other info</li>
                    <li class="mb-3">
                      <i class="  mr-3 text-primary"></i> more info</li>
                  </ul>
                  <a href="#" class="btn btn-primary btn-sub btn-block p-2 shadow rounded-pill">Buy now</a>
                </div>
              
              </div>
             

            </div>
          </div>
        </section>
<Footer/>
      </div>
     
      
)

}

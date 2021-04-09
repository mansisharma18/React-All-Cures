// import React, { Component } from 'react';
// // import SearchService from '../../services/SearchService';
// import Header from '../Header/Header'
// import Footer from '../Footer/Footer';

// class Search extends Component {

//     constructor(props){
//         super(props);
//         this.state = {
//             items: [],
//             isLoaded: false,
//         }
//     }

//     componentDidMount(){
//         fetch('/SearchActionController?cmd=getResults&city=jammu&doctors=sangeeta&Latitude=32.73&Longitude=74.85')
//         .then(res => res.json())
//         .then(json => {
//             console.log(json.map.DoctorDetails.myArrayList);
//             this.setState({
//                 isLoaded: true,
//                 items: json.map.DoctorDetails.myArrayList,
//             })            
//         });
//     }

//     // Load Doctors Data

//     LoadData(data){
        
//       var temp = ''
//       for(let d in data){
//         temp +=`
        
//           <div class="tab-content">
//           <div id="men" class="tab-pane fade in active">
//           <div class="tab-content-detail clearfix mr-20">
//               <div class="dr-detail">
//                 <div class="tab-content-img">
//                      <img src="" alt="special-1"/> 
//                      </div>
//                 <div class="col-md-6 col-sm-12">
//                   <div class="detail-l">
//                     <div class="rating"> <span class="icon-star-1"></span>
//                       <p>4.2</p>
//                     </div>
//                     <div class="name">
//                       <h2>${data[d].map.name}</h2>
//                       <h3>${data[d].map.primary_spl}</h3>
//                       <h4>${data[d].map.hospital_affliated} ${data[d].map.state} ${data[d].map.country_code}</h4>
//                       <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales dolor in ante fermentum, vitae varius turpis imperdiet.”</p>
//                     </div>
//                     <div class="btn-group"> <a href="profile.html" class="btn-bg profile-btn color-white">Profile</a> <a href="javascript:void(0)" class="bg-gray video-btn color-light-gray">Video Consult</a> </div>
//                   </div>
//                 </div>
//                 <div class="col-md-6 col-sm-12">
//                   <div class="detail-r">
//                     <ul class="mon coman-ul">
//                       <p>Mon</p>
//                       <li><a href="javascript:void(0)" class="active">9.00 am</a></li>
//                       <li><a href="javascript:void(0)">10.00 am</a></li>
//                       <li><a href="javascript:void(0)">1.00 pm</a></li>
//                       <li><a href="javascript:void(0)">2.00 pm</a></li>
//                     </ul>
//                     <ul class="tue coman-ul">
//                       <p>Tue</p>
//                       <li><a href="javascript:void(0)">9.00 am</a></li>
//                       <li><a href="javascript:void(0)">10.00 am</a></li>
//                       <li><a href="javascript:void(0)">1.00 pm</a></li>
//                       <li><a href="javascript:void(0)">2.00 pm</a></li>
//                     </ul>
//                     <ul class="wed coman-ul">
//                       <p>Wed</p>
//                       <li><a href="javascript:void(0)">9.00 am</a></li>
//                       <li><a href="javascript:void(0)">10.00 am</a></li>
//                       <li><a href="javascript:void(0)">1.00 pm</a></li>
//                       <li><a href="javascript:void(0)">2.00 pm</a></li>
//                     </ul>
//                     <ul class="ted coman-ul">
//                       <p>Thu</p>
//                       <li><a href="javascript:void(0)">9.00 am</a></li>
//                       <li><a href="javascript:void(0)">10.00 am</a></li>
//                       <li><a href="javascript:void(0)">1.00 pm</a></li>
//                       <li><a href="javascript:void(0)">2.00 pm</a></li>
//                     </ul>
//                     <ul class="fri coman-ul">
//                       <p>Fri</p>
//                       <li><a href="javascript:void(0)">9.00 am</a></li>
//                       <li><a href="javascript:void(0)">10.00 am</a></li>
//                       <li><a href="javascript:void(0)">1.00 pm</a></li>
//                       <li><a href="javascript:void(0)">2.00 pm</a></li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             </div>
//             </div>`;
//         // return <h1>Please sign up.</h1>;
//       }
//       // document.getElementById('test').innerHTML=temp
      
//       return(temp)

//     }

//     render() {
        
//         var { isLoaded,items } = this.state;
//         if(!isLoaded) {
//             console.log(items);

//             return <div>Loading...</div>;
//         }
//         else if(isLoaded){
//         // console.log(users);
//         // LoadData(items);
//          console.log(items);
//         return(

//             <div>
//                 <Header/>
//                 <section class="physicians-tab">
//                   <div class="container">
//                     <div class="row">
//                       <div class="col-md-10 pd-0">
//                         <div class="tab-nav">
//                           <div class="comman-heading">
//                             <h2>All Physicians</h2>
//                           </div>
//                           {/* <!-- Nav tabs --> */}
//                           <ul class="nav">
//                             <li class="active"><a data-toggle="pill" href="#men">Men</a></li>
//                             <li><a data-toggle="pill" href="#women">Women</a></li>
//                             <li><a data-toggle="pill" href="#children">Children</a></li>
//                             <li><a data-toggle="pill" href="#date">16 Sep, 2020</a></li>
//                           </ul>
//                           <a href="javascriptvoid(0)" class="moreFilters color-white btn-bg">More Filters</a>
//                           <div dangerouslySetInnerHTML={{__html: this.LoadData(items)}}>
//                           </div> 
//                           <div class="col-md-2 ads"></div>
//     </div>
//   </div>
//   </div>
//   </div>
  
// </section>
//                 {/* {items.map(item => (
//                     <li key={items.id}>
//                         Name: {item.docid}
//                     </li>
//                 ))};
//                 {items.docid} */}
//                 {/* {this.LoadData(items).temp} */}
//                 {/* {this.LoadData(items)} */}
                
//                 <Footer/>
//             </div>
            
//         );
        

//         }
        
//     }
// }

// export default Search;



import React, { Component } from 'react' ;
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
class Search extends Component {
  constructor(props){
            super(props);
            this.state = {
                items: [],
                isLoaded: false,
            }
        }
    
        componentDidMount(){
            fetch('/SearchActionController?cmd=getResults&city=jammu&doctors=sangeeta&Latitude=32.73&Longitude=74.85')
            .then(res => res.json())
            .then(json => {
                console.log(json.map.DoctorDetails.myArrayList);
                this.setState({
                    isLoaded: true,
                    items: json.map.DoctorDetails.myArrayList,
                })            
            });
        }
    
        // Load Doctors Data
    
        LoadData(data){
            
          var temp = ''
          for(let d in data){
            temp +=`
            <div class="tab-content">
          <div id="men" class="tab-pane fade in active">
          <div class="tab-content-detail clearfix mr-20">
              <div class="dr-detail">
                <div class="tab-content-img">
                     <img src="" alt="special-1"/> 
                     </div>
                <div class="col-md-6 col-sm-12">
                  <div class="detail-l">
                    <div class="rating"> <span class="icon-star-1"></span>
                      <p>4.2</p>
                    </div>
                    <div class="name">
                    <h2>${data[d].map.name}</h2>
                    <h3>${data[d].map.primary_spl}</h3>
                    <h4>${data[d].map.hospital_affliated} ${data[d].map.state} ${data[d].map.country_code}</h4>
                      <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales dolor in ante fermentum, vitae varius turpis imperdiet.”</p>
                    </div>
                    <div class="btn-group"> <a href="profile.html" class="btn-bg profile-btn color-white">Profile</a> <a href="javascript:void(0)" class="bg-gray video-btn color-light-gray">Video Consult</a> </div>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12">
                  <div class="detail-r">
                    <ul class="mon coman-ul">
                      <p>Mon</p>
                      <li><a href="javascript:void(0)" class="active">9.00 am</a></li>
                      <li><a href="javascript:void(0)">10.00 am</a></li>
                      <li><a href="javascript:void(0)">1.00 pm</a></li>
                      <li><a href="javascript:void(0)">2.00 pm</a></li>
                    </ul>
                    <ul class="tue coman-ul">
                      <p>Tue</p>
                      <li><a href="javascript:void(0)">9.00 am</a></li>
                      <li><a href="javascript:void(0)">10.00 am</a></li>
                      <li><a href="javascript:void(0)">1.00 pm</a></li>
                      <li><a href="javascript:void(0)">2.00 pm</a></li>
                    </ul>
                    <ul class="wed coman-ul">
                      <p>Wed</p>
                      <li><a href="javascript:void(0)">9.00 am</a></li>
                      <li><a href="javascript:void(0)">10.00 am</a></li>
                      <li><a href="javascript:void(0)">1.00 pm</a></li>
                      <li><a href="javascript:void(0)">2.00 pm</a></li>
                    </ul>
                    <ul class="ted coman-ul">
                      <p>Thu</p>
                      <li><a href="javascript:void(0)">9.00 am</a></li>
                      <li><a href="javascript:void(0)">10.00 am</a></li>
                      <li><a href="javascript:void(0)">1.00 pm</a></li>
                      <li><a href="javascript:void(0)">2.00 pm</a></li>
                    </ul>
                    <ul class="fri coman-ul">
                      <p>Fri</p>
                      <li><a href="javascript:void(0)">9.00 am</a></li>
                      <li><a href="javascript:void(0)">10.00 am</a></li>
                      <li><a href="javascript:void(0)">1.00 pm</a></li>
                      <li><a href="javascript:void(0)">2.00 pm</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            </div>
            </div>
            `
            
}
      // document.getElementById('test').innerHTML=temp
      
      return(temp)

    }

    render() {
      var { isLoaded,items } = this.state;
        if(!isLoaded) {
            console.log(items);

            return <div>Loading...</div>;
        }
        else if(isLoaded){
        // console.log(users);
        // LoadData(items);
         console.log(items);
        return(
            <div>

                <Header/>
                <section class="physicians-tab">
  <div class="container">
    <div class="row">
      <div class="col-md-10 pd-0">
        <div class="tab-nav">
          <div class="comman-heading">
            <h2>All Physicians</h2>
          </div>
          {/* <!-- Nav tabs --> */}
          <ul class="nav">
            <li class="active"><a data-toggle="pill" href="#men">Men</a></li>
            <li><a data-toggle="pill" href="#women">Women</a></li>
            <li><a data-toggle="pill" href="#children">Children</a></li>
            <li><a data-toggle="pill" href="#date">16 Sep, 2020</a></li>
          </ul>
          <a href="javascriptvoid(0)" class="moreFilters color-white btn-bg">More Filters</a> </div>
          <div dangerouslySetInnerHTML={{__html: this.LoadData(items)}}>
           </div> 
            </div>
            </div>
            </div>
            </section>
            <Footer/>
            </div>
        );
    }
} 
}
export default Search; 
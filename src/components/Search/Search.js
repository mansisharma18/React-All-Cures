// // import React, { Component } from 'react';
// // // import SearchService from '../../services/SearchService';


// // class Search extends Component {

// //     constructor(props){
// //         super(props);
// //         this.state = {
// //             items: [],
// //             isLoaded: false,
// //         }
// //     }

// //     componentDidMount(){
// //         fetch('/DoctorsActionController?docid=7&cmd=getProfile')
// //         // .then(res => JSON.parse(res))
// //         .then(res => res.json())
// //         .then(json => {
// //             console.log(json);
// //             this.setState({
// //                 isLoaded: true,
// //                 items: json,
// //             })
            
// //         });
// //     }

// //     render() {
// //         var { isLoaded,items } = this.state;
// //         if(!isLoaded) {
// //             console.log(items);

// //             return <div>Loading...</div>;
// //         }
// //         else if(isLoaded){
// //         // console.log(users);
        
// //          console.log(items);
// //         return(
// //             <div>
// //                 Data has been loaded.
// //                 {/* {items.map(item => (
// //                     <li key={items.id}>
// //                         Name: {item.name} | {item.email}
// //                     </li>
// //                 ))}; */}
// //                 {items.docid}
// //             </div>
// //         );
// //         }
// //     }
// // }

// // export default Search;





// import React, { Component } from 'react' ;
// import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
// class Search extends Component {

// //     constructor(){
// //         this.state = {
// //             users:[]
// //         }
// //     }

// //     componentDidMount(){
// //         SearchService.getResponse().then((response) => {
// //             this.setState({ users: response.data })
// //         });
// //     }
// constructor(props){
//   super(props);
//   this.state = {
//       items: [],
//       isLoaded: false,
//   }
// }

// componentDidMount(){
//   fetch('/SearchActionController?cmd=getResults&city=jammu&doctors=sangeeta&Latitude=32.73&Longitude=74.85')
//   // .then(res => JSON.parse(res))
//   .then(res => res.json())
//   .then(json => {
//       console.log(json);
//       this.setState({
//           isLoaded: true,
//           items: json,
//       })
      
//   });
// }
//     render() {
//         var { isLoaded,items } = this.state;
//         if(!isLoaded) {
//             console.log(items);

//             return <div>Loading...</div>;
//         }
//         else if(isLoaded){
//         // console.log(users);
        
//          console.log(items.map.DoctorDetails.myArrayList);
//         //  for(item in items.map.DoctorDetails.myArrayList){
//           return(
//             `<div class="tab-content">
//             <div id="men" class="tab-pane fade in active">
//             <div class="tab-content-detail clearfix mr-20">
//                 <div class="dr-detail">
//                   <div class="tab-content-img">
//                        <img src="" alt="special-1"/> 
//                        </div>
//                   <div class="col-md-6 col-sm-12">
//                     <div class="detail-l">
//                       <div class="rating"> <span class="icon-star-1"></span>
//                         <p>4.2</p>
//                       </div>
//                       <div class="name">
//                         <h2>$//{item.docname_first}</h2>
//                         <h3>$//{item.primary_spl}</h3>
//                         <h4>110 West 14th Street, New York, NY, 10011 (1.9mi)</h4>
//                         <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sodales dolor in ante fermentum, vitae varius turpis imperdiet.”</p>
//                       </div>
//                       <div class="btn-group"> <a href="profile.html" class="btn-bg profile-btn color-white">Profile</a> <a href="javascript:void(0)" class="bg-gray video-btn color-light-gray">Video Consult</a> </div>
//                     </div>
//                   </div>
//                   <div class="col-md-6 col-sm-12">
//                     <div class="detail-r">
//                       <ul class="mon coman-ul">
//                         <p>Mon</p>
//                         <li><a href="javascript:void(0)" class="active">9.00 am</a></li>
//                         <li><a href="javascript:void(0)">10.00 am</a></li>
//                         <li><a href="javascript:void(0)">1.00 pm</a></li>
//                         <li><a href="javascript:void(0)">2.00 pm</a></li>
//                       </ul>
//                       <ul class="tue coman-ul">
//                         <p>Tue</p>
//                         <li><a href="javascript:void(0)">9.00 am</a></li>
//                         <li><a href="javascript:void(0)">10.00 am</a></li>
//                         <li><a href="javascript:void(0)">1.00 pm</a></li>
//                         <li><a href="javascript:void(0)">2.00 pm</a></li>
//                       </ul>
//                       <ul class="wed coman-ul">
//                         <p>Wed</p>
//                         <li><a href="javascript:void(0)">9.00 am</a></li>
//                         <li><a href="javascript:void(0)">10.00 am</a></li>
//                         <li><a href="javascript:void(0)">1.00 pm</a></li>
//                         <li><a href="javascript:void(0)">2.00 pm</a></li>
//                       </ul>
//                       <ul class="ted coman-ul">
//                         <p>Thu</p>
//                         <li><a href="javascript:void(0)">9.00 am</a></li>
//                         <li><a href="javascript:void(0)">10.00 am</a></li>
//                         <li><a href="javascript:void(0)">1.00 pm</a></li>
//                         <li><a href="javascript:void(0)">2.00 pm</a></li>
//                       </ul>
//                       <ul class="fri coman-ul">
//                         <p>Fri</p>
//                         <li><a href="javascript:void(0)">9.00 am</a></li>
//                         <li><a href="javascript:void(0)">10.00 am</a></li>
//                         <li><a href="javascript:void(0)">1.00 pm</a></li>
//                         <li><a href="javascript:void(0)">2.00 pm</a></li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
                      
//                   {/* </div> */}
//               </div>
//               </div>`
//         );
//          }
// //         console.log(users);
        
//     }
// }
// }
// export default Search;

import React, { Component } from "react";

import axios from 'axios';

class CommentsRev extends Component {
  constructor(props) {
    super(props);
    const params = props.match.params
    this.state = { 
      items: [],
      commentItems: [],
      isLoaded: false,
      param: params,
      getComments: 'all',
    };
  }
  getComments(val) {

    
    axios.get(`/rating/comments${val}`)
      .then(res => {
        console.log(res)
        this.setState({
          commentItems:res.data
        })
      })
      .catch(err => console.log(err))

    
  }


  poastApproved(val) {

    
    axios.post(`rating/reviewedby/1/reviewed/1${val}`)
      .then(res => {
        console.log(res)
       
      })
      .catch(err => console.log(err))

    
  }



  componentDidMount() {
    
  
    this.getComments('/')

    
  }

render(){
  return (
    <>
              <div className="tab-content">
              <div className="my-3 container" style={{zIndex: '999999'} }>
                                    <select name="" className="form-select"
                                      onChange={(e)=> {
                                        this.setState({
                                          getComments: e.target.value
                                        })
                                        if(e.target.value == '0') {
                                          this.getComments('/0')
                                        }else if(e.target.value == '1') {
                                          this.getComments('/1')
                                        }else {
                                          this.getComments('/')
                                        }
                                      }}
                                      id="">
                                      <option value="all"  onClick={() => this.getComments('/')}>All</option>
                                      <option value="1" onClick={() => this.getComments('/1')} >Approved</option>
                                      <option value="0"  onClick={() => this.getComments('/0')}>UN Approved</option>
                                    </select>
                                    
                                </div>
              /* SLIDESHOW */
 {/* <div className="slideshow"></div> */}
    
                      <div id="patient" className="tab-pane active">
                        
                        <div className="rating-outer" id="rating">
                        
                        {this.state.commentItems.map((item,i) => {
                            return (
                              <>
                                <div className="rating-patient">
                            <div className="rating-patient-grid clearfix">
                              <div className="paitent-profile">
                             
                                {" "}
                                {/* <img src={ClientA} alt="ClientA" />{" "} */}
                              </div>
                              {/* checkbox */}
                              <div>
                                <input type = "checkbox"></input>
                                <button onClick={() => {this.postApproved()}}>Submit</button>
                              </div>
                             

                              <div className="patient-msg">
                              
                                <p>{item.comments}</p>
                              </div>
                            
                              <div className="patient-name-add">
                                <div>
                                  <h3>Mahyar Eidgah</h3>
                                  <span>New York, NY</span>{" "}
                                </div>
                               
                              </div>
                            </div>
                          </div>
                              </>
                            )
                          })}
                          
                         

                          
                          <div className="rating-footer">
                            <div className="back-top">
                              {" "}
                              <a href="#">
                                <p>
                                  <i
                                    className="fa fa-angle-up"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Back to Top
                                </p>
                              </a>{" "}
                            </div>
                            <a
                              href="//#"
                              className="read-more-rating"
                            >
                              Read more Reviews
                            </a>{" "}
                          </div>
                          <div className="faqs" id="faq">
                            <div className="faqs-wrap">
                              <div className="question">
                                <h2>
                                  How soon can I make an appointment with Dr.
                                  Jordan Reich?
                                </h2>
                                <p>
                                  Generally, Dr. Jordan Reich has appointments
                                  available on Zocdoc within 1 week. You can see
                                  Dr. Sanghi's earliest availability on Zocdoc
                                  and{" "}
                                  <a href="/#">Make an appointment online.</a>
                                </p>
                              </div>
                              <div className="question">
                                <h2>
                                  Is Dr. Jordan Reich accepting new patients?
                                </h2>
                                <p>
                                  Dr. Pramod Sanghi generally accepts new
                                  patients on Zocdoc. You can see Dr. Reich's
                                  earliest availability on Zocdoc and{" "}
                                  <a href="/#">
                                    Schedule an appointment online.
                                  </a>
                                </p>
                              </div>
                              <div className="question">
                                <h2>
                                  Does Dr. Jordan reich accept my insurance?
                                </h2>
                                <p>
                                  <a href="/#">Choose your insurance plan</a> to
                                  verify if Dr. Jordan Reich is in-network.
                                </p>
                              </div>
                              <div className="question">
                                <h2>
                                  Can I make an appointment with Dr. Jordan
                                  Reich online?
                                </h2>
                                <p>
                                  Yes, you can{" "}
                                  <a href="/#">Make an appointment online.</a>{" "}
                                  with Dr. Reich using Zocdoc. It’s simple,
                                  secure, and free.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="rating-footer">
                            <div className="back-top">
                              {" "}
                              <a href=" #">
                                <p>
                                  <i
                                    className="fa fa-angle-up"
                                    aria-hidden="true"
                                  ></i>{" "}
                                  Back to Top
                                </p>
                              </a>{" "}
                            </div>
                            <a
                              href="//#"
                              className="read-more-rating"
                            >
                              Read more Reviews
                            </a>{" "}
                          </div>
                        </div>
                      </div>
                      <div id="recomended" className="tab-pane fade">
                        <h3>Menu 1</h3>
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </p>
                      </div>
                    </div>
    </>
    
  )
}





 
// const Comment = ({refreshComments}) => {

//   const [cmtText,setCmtText] = React.useState('')


//   const postComment = (e) => {
//       e.preventDefault()

//       if(cmtText != '') {
//           axios.post(`/DoctorRatingActionController?ratingVal=3&comments='${cmtText}'&ratedbyid=1&ratedbytype=1&targetid=1&targetTypeid=1&cmd=rateAsset`)
//           .then(res => console.log(res))
//           .catch(err => console.log(err))
//            refreshComments()
//       }else {
//           alert('Enter comment')
//       }
      
//   }

//   return (
//       <>
//           <div>
//               <form action="" onSubmit={(e) => postComment(e)} className="form-group">
//                   <label htmlFor="">Comment</label>
//                   <textarea name="" 
//                   onChange={(e) => {
//                       setCmtText(e.target.value)
//                   }}
//                   className="form-control" id="" cols="30" rows="10"></textarea>
//                   <div className="my-4">
//                       <button type="submit" className="btn btn-primary">Submit</button>
//                   </div>
//               </form>
//           </div>
//       </>
//   )
// }
}
export default CommentsRev; 
import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Rating from "../StarRating";  
import ClientA from "../../assets/img/client-a.jpg";
import Cookies from 'js-cookie';
import Doct from "../../assets/img/doct.png";
import '../../assets/healthcare/css/main.css';
import '../../assets/healthcare/css/responsive.css';
import '../../assets/healthcare/css/animate.css';
import '../../assets/healthcare/icomoon/style.css';
import { Container, Button } from "react-bootstrap"
import axios from 'axios';
import EditProfile from "./EditProfile";
import { backendHost } from '../../api-config';
import Comment from '../Comment'
import '../../assets/healthcare/css/mobile.css'
import ArticleComment from '../ArticleComment';


class Profile extends Component {
  constructor(props) {
    super(props);
    const params = props.match.params
    this.editToggle = this.editToggle.bind(this)
    this.fetchDoctorData = this.fetchDoctorData.bind(this)
    this.state = { 
      items: [],
      commentItems: [],
      ratingValue: '',
      firstName: [],
      lastName: [],
      isLoaded: false,
      param: params,
      edit: false,
      
      modalShow: false,
      show: false,
      acPerm: Cookies.get('acPerm').split('|')
    }; 
    // this.editToggle = this.editToggle.bind()
  }
 
  
  getComments = (id) => {
    axios.get(`${backendHost}/rating/target/${id}/targettype/1`)
    .then(res => {
      this.setState({
        commentItems:res.data
      })
    })
    .catch(err => console.log(err))
  }

  
  
  showComments = (item, i) => {
    if(item.reviewed === 1 && item.comments !== "null"){
      return (
        <>
        <div className="col-12">
          <div className="card my-4 ">
            <div className="card-body">
                <h5 className="h6"> {item.comments}</h5>
                <div className="card-info">
                    <h6 className="card-subtitle mb-2 text-muted">
                      <b>By :  </b>  {item.first_name} {item.last_name}
                    </h6>
                </div>
            </div>
          </div>
        </div>
      </>
      )
    }
  }

  getRating = (docId) => {
    axios.get(`${backendHost}/rating/target/${docId}/targettype/1/avg`)
    .then(res => {
      this.setState({
        ratingValue: res.data
      }, ()=> {
        setTimeout(() => {
          this.showRating(this.state.ratingValue)
        }, 1000);
      })
    }) 
    .catch(err => console.log(err))
  }

  fetchDoctorData = (id) => {
    fetch(`${backendHost}/DoctorsActionController?rowno=${id}&cmd=getProfile`)
      // .then(res => JSON.parse(res))
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });

  }
  showRating = (val) => {
    if(document.getElementById('doctor-avg-rating')){
      for(let i=0 ; i<val; i++){
        document.getElementById('doctor-avg-rating').children[i].classList.add('checked')  
      }
    }
  }
  

  editToggle = () => {
    if(this.state.edit === false){
      this.setState({
        edit: true
      })
    } else{
      this.setState({
        edit: false
      })
    }
  }

  componentDidMount() {
    document.title = "All Cures | Profile"
    this.fetchDoctorData(this.state.param.id)
    this.getComments(this.state.param.id)
    this.getRating(this.props.match.params.id)
  }



  setModalShow =(action) => {
    this.setState({
      modalShow: action
    })
  }
  handleClose = () => {
    this.setState({
      show: false
    })
  }


  handleShow = () => {
    this.setState({
      show: true
    })
  }
  
  render() {
    var { isLoaded, items, acPerm } = this.state;
    if (!isLoaded) {

      return(
        <>
          <Header history={this.props.history}/>
          <Container className="my-5 loading">
              <div className="loader ">
                <i className="fa fa-spinner fa-spin fa-6x" />
              </div>
            </Container>
          <Footer/>
        </>  
      );

    } else if(isLoaded && items == null){
      return(
        <>
        <Header history={this.props.history}/>
          <Container className="mt-5 my-5">
          <h3 className="m-auto text-center"><span className="icon-loupe "></span></h3>
          <h3 className="text-center">Doctor not found</h3>
          </Container>
        <Footer/>
        </>
      )
    }else if (isLoaded) {
      return (
        <div>
          <Header history={this.props.history} />
          
          <section className="Profileleft">
            <div className="container">
              <div className="row">
                <div className="col-md-8 pd-0">
                  <div className="profile-card clearfix">
                    <div className="col-md-3">
                      <div className="profileImageBlok">
                        <div className="profile-card-img text-center">
                          <i className="fas fa-user-md fa-6x"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="profile-info">
                        <div className="profile-infoL-card">
                          <div className="profile-info-name" id="DocDetails">
                          <div className="h4 font-weight-bold">
                              {items.prefix}. {items.docname_first} {items.docname_middle}{" "}
                              {items.docname_last}{" "}
                            </div>
                            <div className="h5 "> {items.primary_spl}</div>
                            <div className="h5 ">{items.experience}</div>
                            <div className="h5 "> 
                              {items.hospital_affliated}{" "}
                              {items.country_code}
                            </div>
                                   {/* Show average rating */}
              {
                this.state.ratingValue?
                  <div className="average-rating mt-2 mb-4" id="doctor-avg-rating">
                    <span class="fa fa-star fa-2x opacity-7"></span>
                    <span class="fa fa-star fa-2x opacity-7"></span>
                    <span class="fa fa-star fa-2x opacity-7"></span>
                    <span class="fa fa-star fa-2x opacity-7"></span>
                    <span class="fa fa-star fa-2x opacity-7"></span>
                  </div>
                : null
              }
                            <div>

                            

                            </div>
                            {/* <div className="rating">
                              
                           
                            <p>{this.state.ratingValue}</p>
                  <span className="fa fa-star"></span>

                  
                 
               </div> */}
                           
                          </div>
                          
                        </div>
                        <div className="rating-reviews">
                          <div className="profile-info-rating">
                            <h2>
                              <form
                              
                                className="rating"
                              >
                                {/* <Rating /> */}
                              </form>
                            </h2>
                          </div>
                          <div className="reviews" >
                            
                            {
                              acPerm[1] === '9' || parseInt(acPerm[0]) === parseInt(this.state.param.id)?
                              <Button variant="dark" onClick={() => this.setModalShow(true)}>
                                Edit Profile
                              </Button>
                              : null
                            }
      <EditProfile
        show={this.state.modalShow}
        onHide={() => this.setModalShow(false)}
        items={items}
        fetchDoctor = {this.fetchDoctorData}
        id={this.state.param.id}


      />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="aboutDr">
                      <div className="h4 font-weight-bold">
                      About {items.prefix}. {items.docname_first} {items.docname_middle}{" "}
                      {items.docname_last}
                    </div>
                   
                    <div id="about-contain">
                      <p className="text one">
                        {" "}
                        {items.about}{" "}
                      </p>
                    </div>
                    <br />
                    <div className="about-specialties">
                      <div className="h4 font-weight-bold">Specialties</div>
                      <ul>
                        <li>{items.primary_spl}</li>
                      
                      </ul>
                      <ul>
                        <li>{items.other_spls}</li>
                       
                      </ul>
                    </div>
                    <br/>
                    <div className="abt-eduction ">
                    <div className="h4 font-weight-bold">Education</div>
                      <ul>
                        <li>{items.edu_training}</li>
                      </ul>
                    </div>
                    <br />
                   
                    {/* </div> */}
                    <div className="abt-eduction ">
                    <div className="h4 font-weight-bold">Miscellaneous
                      </div>
                        <div className="h6 font-weight-bold">Accepts Insurance: 
                        {
                          items.insurance_accept === true?
                          <span> <i className="fa fa-check" style={{color: 'green'}} aria-hidden="true"></i></span>
                          : <span> <i className="fas fa-times-circle " style={{color: 'red'}}></i></span>
                        }
                        </div>
                        <div className="h6 font-weight-bold">Gender: 
                        {
                          items.gender === 2?
                          <span> Male </span>
                          : <span> Female</span>
                        }
                        </div>

                      </div>
                    
                  </div>
                  <div className="profile-info-rating">
                    <h3>Rate here</h3>
                        <Rating  docid={this.state.param.id} />
                          
                       
                        </div>
                  <div className="comment-box">
              
                  {
                Cookies.get('acPerm')?
                  <>              
                    <Comment refreshComments={this.getComments} docid={this.props.match.params.id}/>
                  </>
                : null
              }

                  </div>

                   {/* SHOW ALL COMMENTS */}
              <div className="main-hero">
                {!this.state.showMore?
                this.state.comment.slice(0, 3).map((item,i) => (
                  this.showComments(item, i)
                )):
                this.state.comment.map((item,i) => (
                  this.showComments(item, i)
                ))
                }
            </div>
            {
              this.state.comment?
                this.state.comment.length > 3 &&
                  <button id="show-hide-comments" className="white-button-shadow btn w-100" 
                    onClick={() => {
                      this.state.showMore?
                      this.setState({
                      showMore: false
                      }): 
                      this.setState({
                        showMore: true
                        })
                    }}>
                      {
                        !this.state.showMore?
                        'Show more'
                        : 'Hide'
                      }
                  </button>
                : null
            }
                </div>
              
              </div>
            </div>
          </section>
          <section className="chat">
            <div className="container">
              <div className="row">
                <div className="">
                  {" "}
                  <a href="//#">
                    {" "}
                    <span className="icon-chatbot">
                      <span className="path1"></span>
                      <span className="path2"></span>
                      <span className="path3"></span>
                      <span className="path4"></span>
                      <span className="path5"></span>
                      <span className="path6"></span>
                      <span className="path7"></span>
                      <span className="path8"></span>
                      <span className="path9"></span>
                      <span className="path10"></span>
                      <span className="path11"></span>
                      <span className="path12"></span>
                      <span className="path13"></span>
                      <span className="path14"></span>
                      <span className="path15"></span>
                      <span className="path16"></span>
                      <span className="path17"></span>
                      <span className="path18"></span>
                      <span className="path19"></span>
                    </span>{" "}
                  </a>{" "}
                </div>
              </div>
            </div>
          </section>
          <div>
     
 
         </div>
<div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
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
                        <div className="btn-Gropu">
                           <a href="/#" className="appBTN">App Store</a>
                           <a href="/#" className="appBTN">App Store</a>
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
          <Footer />
        </div>
      );
      
    } 
    
  }  
}

export default Profile;

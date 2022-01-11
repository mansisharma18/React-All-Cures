import React, { Component } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Rating from "../StarRating";
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
// import ArticleComment from '../ArticleComment';
import { userId } from "../UserId";
import { userAccess } from "../UserAccess";
import AllPost from "../BlogPage/Allpost";
import {UserId} from "../UserId"

class Profile extends Component {
  constructor(props) {
    super(props);
    const params = props.match.params
    this.editToggle = this.editToggle.bind(this)
    this.fetchDoctorData = this.fetchDoctorData.bind(this)
    this.state = {
      items: [],
      articleItems: [],
      comment: [],
      ratingValue: '',
      rating: [],
      firstName: [],
      lastName: [],
      isLoaded: false,
      param: params,
      edit: false,
      showMore: false,
      modalShow: false,
      show: false,
      imageExists: false
    };
  }

  allPosts() {                        // For all available blogs "/blogs"
    fetch(`${backendHost}/article/authallkv/reg_type/1/reg_doc_pat_id/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((json) => {
        var temp = []
        json.forEach(i => {
          if (i.pubstatus_id === 3) {
            temp.push(i)
          }
        });
        this.setState({
          articleItems: temp
        })
      })
      .catch(err =>
        console.log(err)
      )
  }

  getComments = (id) => {
    axios.get(`${backendHost}/rating/target/${id}/targettype/1`)
      .then(res => {
        var temp = []
        res.data.forEach(i => {
          if (i.reviewed === 1 && i.comments !== "null") {
            temp.push(i)
          }
        })
        this.setState({
          comment: temp
        })
      })
      .catch(err => console.log(err))
  }



  showComments = (item, i) => {
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

  getRating = (docId) => {
    axios.get(`${backendHost}/rating/target/${docId}/targettype/1/avg`)
      .then(res => {
        this.setState({
          ratingValue: res.data
        }, () => {
          setTimeout(() => {
            this.showRating(this.state.ratingValue)
          }, 1000);
        })
      })
      .catch(err => console.log(err))
  }

  
  getRate = (docId) => {
    axios.get(`${backendHost}/rating/target/${docId}/targettype/1?userid=${userId}`)
      .then(res => {
        this.setState({
          rating: res.data[0].ratingVal
        }, ()=> console.log(this.state.rating))
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
        }, () => this.checkIfImageExits(`https://all-cures.com/cures_articleimages/doctors/${json.rowno}.png`));
      });

  }
  showRating = (val) => {
    if (document.getElementById('doctor-avg-rating')) {
      for (let i = 0; i < val; i++) {
        document.getElementById('doctor-avg-rating').children[i].classList.add('checked')
      }
    }
  }


  editToggle = () => {
    if (this.state.edit === false) {
      this.setState({
        edit: true
      })
    } else {
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
    this.getRate(this.props.match.params.id)
    this.allPosts()
  }

  setModalShow = (action) => {
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

  checkIfImageExits = (imageUrl) => {
    fetch(imageUrl, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          this.setState({
            imageExists: true
          })
        } else {
          this.setState({
            imageExists: false
          })
        }
      }).catch(err => console.log('Error:', err));
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {

      return (
        <>
          <Header history={this.props.history} />
          <Container className="my-5 loading">
            <div className="loader ">
              <i className="fa fa-spinner fa-spin fa-6x" />
            </div>
          </Container>
          <Footer />
        </>
      );

    } else if (isLoaded && items == null) {
      return (
        <>
          <Header history={this.props.history} />
          <Container className="mt-5 my-5">
            <h3 className="m-auto text-center"><span className="icon-loupe "></span></h3>
            <h3 className="text-center">Doctor not found</h3>
          </Container>
          <Footer />
        </>
      )
    } else if (isLoaded) {

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
                        <div className="profile-card-img text-center" id="profile-card-img">
                          {/* {
                            finalUrlExists === false?
                              <img src={imageUrl} />
                            : <i className="fas fa-user-md fa-6x"></i>
                          } */}
                          {
                            this.state.imageExists ?
                              <img src={`https://all-cures.com/cures_articleimages/doctors/${items.rowno}.png`} />
                              : <i className="fas fa-user-md fa-6x"></i>
                          }

                        </div>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="profile-info">
                        <div className="profile-infoL-card">
                          <div className="profile-info-name" id="DocDetails">
                            <div className="h4 font-weight-bold">
                              {items.prefix} {items.docname_first} {items.docname_middle}{" "}
                              {items.docname_last}{" "}
                            </div>
                            <div className="h5 text-capitalize"> {items.primary_spl}</div>
                            <div className="h5 ">{items.experience}</div>
                            <div className="h5 text-capitalize">
                              {items.hospital_affliated}{" "}
                              {items.country_code}
                            </div>
                            {/* Show average rating */}
                            {
                              this.state.ratingValue ?
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


                          </div>

                        </div>
                        <div className="rating-reviews">
                          <div className="profile-info-rating">
                            <h2>
                              <form

                                className="rating"
                              >
                              </form>
                            </h2>
                          </div>
                          <div className="reviews" >

                            {
                              userAccess === '9' || parseInt(userId) === parseInt(this.state.param.id) ?
                                <Button variant="dark" onClick={() => this.setModalShow(true)}>
                                  Edit Profile
                                </Button>
                                : null
                            }
                            <EditProfile
                              show={this.state.modalShow}
                              onHide={() => this.setModalShow(false)}
                              items={items}
                              fetchDoctor={this.fetchDoctorData}
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
                    <div className="abt-eduction ">
                      <div className="h4 font-weight-bold">Education</div>
                      {items.edu_training.split('•').map((i, idx) => <li className={`list-${idx}`}>{i}</li>)}
                    </div>
                    <div className="mt-5">
                      <div className="h4 font-weight-bold">Accomplishments</div>
                      {items.awards.split('•').map((i, idx) => <li className={`list-${idx}`}>{i}</li>)}
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
                    <br />

                    {/* </div> */}
                    <div className="abt-eduction ">
                      <div className="h4 font-weight-bold">Miscellaneous
                      </div>
                      <div className="h6 font-weight-bold">Accepts Insurance:
                        {
                          items.insurance_accept === true ?
                            <span> <i className="fa fa-check" style={{ color: 'green' }} aria-hidden="true"></i></span>
                            : <span> <i className="fas fa-times-circle " style={{ color: 'red' }}></i></span>
                        }
                      </div>
                      <div className="h6 font-weight-bold">Gender:
                        {
                          items.gender === 2 ?
                            <span> Male </span>
                            : <span> Female</span>
                        }
                      </div>

                    </div>

                  </div>
                  
                  
               
                

                  {
                     <div className="profile-info-rating">
                      <h3>Rate here</h3> <p>Your Earlier Rated {this.state.rating } <span className="icon-star-1"></span></p>
                      <div id="docRate">
                        
                        <Rating docid={this.state.param.id} ratingVal={this.state.rating} />
                     
                      </div>


                    </div>
                  }
                  
                  <div className="comment-box">

                    {
                      userId ?
                        <>
                          <Comment refreshComments={this.getComments} docid={this.props.match.params.id} />
                        </>
                        : null
                    }

                  </div>

                  {/* SHOW ALL COMMENTS */}
                  <div className="main-hero">
                    {!this.state.showMore ?
                      this.state.comment.slice(0, 3).map((item, i) => (
                        this.showComments(item, i)
                      )) :
                      this.state.comment.map((item, i) => (
                        this.showComments(item, i)
                      ))
                    }
                  </div>
                  {
                    this.state.comment ?
                      this.state.comment.length > 3 &&
                      <button id="show-hide-comments" className="white-button-shadow btn w-100"
                        onClick={() => {
                          this.state.showMore ?
                            this.setState({
                              showMore: false
                            }) :
                            this.setState({
                              showMore: true
                            })
                        }}>
                        {
                          !this.state.showMore ?
                            'Show more'
                            : 'Hide'
                        }
                      </button>
                      : null
                  }
                </div>
                <div className="col-md-4">
                  <div className="profile-card doctors-article d-flex flex-column">
                    <div className="h5 font-weight-bold mb-3">
                      {/* No cures By Dr. {items.docname_first} {items.docname_middle} {items.docname_last} yet */}
                      <div className="text-center">Explore Cures</div></div>
                    {this.state.articleItems ?
                      this.state.articleItems.map((i, index) => index < 2 && (
                        <AllPost
                          id={i.article_id}
                          title={i.title}
                          f_title={i.friendly_name}
                          w_title={i.window_title}
                          type={i.type}
                          content={decodeURIComponent(i.content ?
                            i.content.includes('%22%7D%7D%5D%7D') ?
                              i.content
                              : i.content.replace('%7D', '%22%7D%7D%5D%7D')
                            : null)}
                          // type = {i.type}
                          published_date={i.published_date}
                          over_allrating={i.over_allrating}
                          // country = {i.country_id}
                          imgLocation={i.content_location}
                        // history = {props.history}
                        />
                      ))
                      : null
                    }
                  </div>
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
                      <div className="appStoreBg clearfix" style={{ display: "flex", width: "100%", flexWrap: 'wrap' }}>
                        <div className="col-md-6 col-sm-6 col-sx-12">
                          <div className="innerapp">
                            <div className="doc-img">
                              <img src={Doct} alt="doct" />
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

import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Select, MenuItem } from '@material-ui/core';

import {Container, Row, Col, Breadcrumb } from "react-bootstrap";
import {Link } from 'react-router-dom'
import CenterWell from './CenterWell';
import Sidebar from "./leftMenu";
import SidebarRight from "./RightMenu";
import { backendHost } from '../../api-config';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';
import Input from '@material-ui/core/Input';
import ArticleComment from '../ArticleComment';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import HelmetMetaData from '../HelmetMetaData';
import {FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton} from "react-share";
import Cookies from 'js-cookie'
import WriterImg from '../../assets/healthcare/img/images/special-1.jpg'

class Disease extends Component {
  constructor(props) {
    super(props);
    const acPerm = Cookies.get("acPerm")
    this.state = { 
      items: [],
      comment: [],
      isLoaded: false,
      ratingValue: '',
      param : this.props.match.params,
      disease: '',
      regions: '',
      regionPostsLoaded: false,
      regionalPost: [],
      showMore: false,
      value:'',
      type:'',
      diseaseList:[],
      disease:[],
      cures:[],
      showAlert: false,
      alertMsg: ''
    };
  }

  fetchBlog = () => {
    fetch(`${backendHost}/article/${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        }, 
        () => {
          this.fetchCountriesCures()
          this.regionalPosts()
        });
      });
  }

  Alert = (msg) => {
    this.setState({
       showAlert:true,
       alertMsg: msg
    })
    setTimeout(() => {
       this.setState({
          showAlert: false
       })
    }, 5000);
  }

  postSubscribtion() {
    //  var mobileNumber = this.state.mobile.split('+')
    console.log('value: ', this.state.value)
    var phoneNumber = this.state.value.split('+')[1]
    console.log(phoneNumber)
    var countryCodeLength = phoneNumber.length % 10
     console.log('Country COde:', countryCodeLength)
    var countryCode = phoneNumber.slice(0, countryCodeLength)
    console.log(countryCode)
    var StringValue = phoneNumber.slice(countryCodeLength).replace(/,/g, '')
    console.log(StringValue)
     if(phoneNumber){
       this.setState({
          afterSubmitLoad: true
       })
      axios.post(`${backendHost}/users/subscribe/${StringValue}`, {
      "nl_subscription_disease_id":this.state.disease.join(','),
      "nl_sub_type": this.state.type.indexOf('1') === -1 ? 0: 1,
      "nl_subscription_cures_id":this.state.cures.join(','),
      "country_code": countryCode,
      })
        .then(res => {
         this.setState({
            afterSubmitLoad: false
         })
         if(res.data === 1){
            this.Alert('You have successfully subscribed to our Newsletter')
         }
         else {
            this.Alert('Some error occured! Please try again later.')
         }
        })
        .catch(err => {
         this.setState({
            afterSubmitLoad: false
         })
         this.Alert('Some error occured! Please try again later.')
         
   
      })
     } else {
        this.Alert('Please enter a valid number!')
     }
  }
  fetchCountriesCures = () => {
    fetch(`${backendHost}/isearch/treatmentregions/${this.state.items.disease_condition_id}`)
      .then((res)=> res.json())
      .then((json) => {
        this.setState({
          regions: json
        })
      })
      .catch(err => 
        console.log(err)
      )
  }

  getRating = (ratingId) => {
    axios.get(`${backendHost}/rating/target/${ratingId}/targettype/2/avg`)
    .then(res => {
      this.setState({
        ratingValue: res.data
      })
    }) 
    .catch(err => console.log(err))
  }

  regionalPosts(){
    fetch(`${backendHost}/isearch/treatmentregions/${this.state.items.disease_condition_id}`)       // /isearch/treatmentregions/${this.state.diseaseCondition}
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        regionPostsLoaded: true,
        regionalPost: json,
      });
    })
    .catch(err => 
      console.log(err)
  )
  }
  comments() {                        // For all available blogs "/blogs"
    fetch(`${backendHost}/rating/target/${this.props.match.params.id}/targettype/2`)
      .then((res) => res.json())
      .then((json) => {
        var temp = []
        json.forEach(i => {
          if(i.reviewed === 1 && i.comments !== "null"){
            temp.push(i)
          }
        })
        this.setState({
          comment: temp
        })
      })
      .catch(err => 
        console.log(err)
    )
  }

  showRating = (val) => {
    if(document.getElementById('avg-rating')){
      for(let i=0 ; i<val; i++){
        document.getElementById('avg-rating').children[i].classList.add('checked')  
      }
    }
  }
 
  showComments = (item, i) => {
      return (
        <>
        <div className="col-12">
          <div className="card my-4 ">
            <div className="card-body d-flex">
              <div className='comment-img'>
                <i className="fas fa-user-md fa-4x pl-3 mb-2"></i>
                <h6 className="card-subtitle mb-2 text-muted">
                        <b>By :  </b>  {item.first_name} {item.last_name}
                      </h6>
              </div>
              <div>
                <h5 className="h5 mt-3"> {item.comments}</h5>
                  <div className="card-info">
                  </div>
              </div>
                
            </div>
          </div>
        </div>
      </>
      )
  }
   handleSelect = function(subs) {
    const flavors = [];
    for (let i=0; i<subs.length; i++) {
        flavors.push(subs[i].value);
    }
    this.setState({
      type:flavors
    })
    
}
 getDisease = () => {
    axios.get(`${backendHost}/article/all/table/disease_condition`)
    .then(res => {
        console.log(res.data);
        this.setState({
          diseaseList:res.data
        })
       
    })
    .catch(err => console.log(err))
}

  componentDidMount() {
    this.fetchBlog()
    this.comments()
    this.getRating(this.props.match.params.id)
    this.getDisease()
  }

  componentDidUpdate(prevProps){
    if ( prevProps.match.params.id !== this.props.match.params.id){
      this.fetchBlog()
      this.comments()
      this.getRating(this.props.match.params.id)
    }
  }

  handleChange = e => {
    this.setState({
        disease: e.target.value 
    });
  }

  render() { 
    var { isLoaded,items } = this.state;
    if(!isLoaded) {
    return (
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
  } else if(isLoaded){

    // FInding distinct regions from fetchCountriesData()
    const finalRegions = [];
    const map = new Map();
    for (const item of this.state.regions) {
        if(!map.has(item.countryname)){
            map.set(item.countryname, true);    // set any value to Map
            finalRegions.push({
              countryname: item.countryname
            });
        }
    }

    var artContent = items.content;
    var a = JSON.parse(decodeURIComponent(artContent))
    var b = a.blocks
    return (
    <div>
      <Header history={this.props.history}/>
        <HelmetMetaData title={items.title} description={items.title} ></HelmetMetaData>
        <div className="ad-spac">
          {/* <img src={Wall} height="200px" width="1900px"/> */}
        </div>
        <Row>
          <Col md={2} id="sidebar-wrapper" className='left-menu pb-3'>      
            <Sidebar diseaseId={items.disease_condition_id} id={this.props.match.params.id}  name={items.dc_name} />
          </Col>
          <Col  md={7} id="page-content-wrapper" className="col-xs-12 pb-5">
            <div id="center-well" className="">
              <Breadcrumb >
                   
                <Breadcrumb.Item className='mt-1 pb-2' href="/"id="s1">Home</Breadcrumb.Item>                                     
                <Breadcrumb.Item className='mt-1'id="s1">
                  <Link to="/cures">
                    Cures
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item className='mt-1'id="s1">
                  <Link to={`/cures/${items.dc_name}`}>
                    {items.dc_name}
                  </Link>
                </Breadcrumb.Item>
                
                <div id="share-icons-regions">
                {/* Sharing icons */}
                <div>
                <FacebookShareButton
                  url={"https://all-cures.com"}
                  quote={"All-Cures - All in one Health App"}
                  hashtag="#allCures"
                  className="socialMediaButton"
                >
                  <FacebookIcon size={36} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={"https://all-cures.com"}
                  title={"All-Cures - All in one Health App"}
                  hashtag="#allCures"
                  className="socialMediaButton"
                >
                  <TwitterIcon size={36} />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={`https://all-cures.com/#${this.props.location.pathname}`}
                  title={`*All Cures -* ${items.title}`}
                  separator=": "
                  className="socialMediaButton"
                >
                  <WhatsappIcon size={36} />
                </WhatsappShareButton>
              </div>
              
              <div className="share-buttons-region ml-5">
              
              <div className="d-flex justify-content-end margin-auto" id="article-acc-to-regions">
                
              { finalRegions?
                  finalRegions.map(i => (
                    <Dropdown>
                      <Dropdown.Toggle className="mr-2 btn btn-info color-white">
                        <span className="color-white">{i.countryname}</span>
                      </Dropdown.Toggle>
                    <Dropdown.Menu>
                    {
                      this.state.regionalPost.map(j => j.countryname === i.countryname 
                        // && j.type == 2 
                        &&(
                        <>
                        <Dropdown.Item href="#" className="pt-2">
                        <Link to={ `/cure/${j.article_id}` }  className="d-flex justify-content-between align-items-center mr-2">
                          <div className="d-flex justify-content-between align-items-center mb-2"id="artBtn">
                            <div>                  
                              <div className="card-title mr-5">{j.title}</div>
                            </div>
                            <div>
                              {
                                j.type === '1'?
                                  <div className="chip overview">Overview</div>
                                : j.type === '2'?
                                  <div className="chip cure">Cures</div>
                                : j.type === '3'?
                                  <div className="chip symptoms">Symptoms</div>
                                : null
                              }
                            </div>
                          </div>
                        </Link>
                        </Dropdown.Item>
                        </>
                      ))
                    }
                  </Dropdown.Menu>
                </Dropdown>
                  ))
                : null
              }
                </div>
                </div>
                </div>
              </Breadcrumb>
              
            
              <div className="article-title-container">
              <div className="h1 font-weight-bold text-capitalize text-decoration-underline">{items.title.toLowerCase()}</div>
              
 {/* Show average rating */}
 {
                this.state.ratingValue?
                <div className="average-rating mt-2 mb-4 ml-3" id="avg-rating">
                <span class="fa fa-star fa-2x  opacity-7"></span>
                <span class="fa fa-star fa-2x  opacity-7"></span>
                <span class="fa fa-star fa-2x  opacity-7"></span>
                <span class="fa fa-star fa-2x  opacity-7"></span>
                <span class="fa fa-star fa-2x  opacity-7"></span>
                </div>
                : null
              }
               {/* Call average rating fetch function */}
              {
                this.state.ratingValue? this.showRating(this.state.ratingValue) : null
              }
            </div>


              {/* Call average rating fetch function */}
              {
                this.state.ratingValue? this.showRating(this.state.ratingValue) : null
              }
            {/* Center Well article main content */}
              <div id="article-main-content">
                {b.map((i) => (
                  <CenterWell
                    pageTitle = {items.title}
                    level = {i.data.level}
                    content = {i.data.content}
                    type = {i.type}
                    text = {i.data.text}
                    title = {i.data.title}
                    message = {i.data.message}
                    source = {i.data.source}
                    embed = {i.data.embed}
                    caption = {i.data.caption}
                    alignment = {i.data.alignment}
                    imageUrl = {i.data.file? i.data.file.url: null}

                    url = {i.data.url}
                    item = {i.data.items}
                    props = {this.props}
                  />
                ))}
              </div>
                  <div className='text-muted text-left ml-3 mb-4'>Published on: {items.published_date}</div>
              {/* Author */}

              <div className='about-writer d-flex mb-4'>
                <div id="writer-img ml-3">
                  <img src={WriterImg} width='200px' height="150px" />
                </div>
                <div className="writer-info ml-3">
                  <div className='h5 mt-4 rounded'></div>
                  <div>Dr. John Doe</div>
                  <div>Anatomy Specialist</div>
                </div>
              </div>
              
              
            
            </div>
            <div id="comments-column">
                  {/* Review Button (Rating + Comment) */}
              {
                Cookies.get('acPerm')?
                  <>              
                    <ArticleComment refreshComments={this.comments} article_id={this.props.match.params.id}/>
                  </>
                : null
              }
              

              {/* SHOW ALL COMMENTS */}
              <div className="main-hero">
                {!this.state.showMore?
                this.state.comment.slice(0, 1).map((item,i) => (
                  this.showComments(item, i)
                )):
                this.state.comment.map((item,i) => (
                  this.showComments(item, i)
                ))
                }
            </div>
            {
              this.state.comment?
                this.state.comment.length > 1 &&
                  <button id="show-hide-comments" className="white-button-shadow btn w-75 mb-4 ml-3" 
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
          </Col> 
          <Col id="sidebar-wrapper">      
            <SidebarRight title={items.title} history={this.props.history} />
          </Col>
        </Row>
        <div>
         
         <button id="mobile-subscribe-fixed-btn" className="btn newsletter-icon rounded subscribe-btn newsletter_float" data-toggle="modal"data-target=".bd-example-modal-lg">
      Subscribe
     
            </button>
           
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
                           {/* <img src={Doct} alt="doct"/> */}
                           <div className="aaa">
                             <div className='container'>
                    <h3 className="text-dark">Subscribe Your Disease/Cures Type</h3></div><br/>
                    <select 
                    multiple
               
                    name="type" placeholder="Type" 
                    value={this.state.type} 
                    
                    onChange={(e)=> {
                       this.handleSelect(e.target.selectedOptions)
                    }}
                    required className="form-control">
                        <option value="1">All</option>
                        <option value="2">Disease</option>
                        <option value="3">Cures</option>
                    </select>
                </div>
                {   
                    this.state.type?
                    this.state.type.indexOf('2') === -1 
                    ? null 
                    :                             <div className="col-lg-6 form-group">
                    <label htmlFor="">Disease</label>
                        <Select multiple
                        value={this.state.disease}
                        onChange={(e) =>  this.setState({
                          disease:e.target.value
                        })
                          }
                        input={<Input id="select-multiple-chip" />}
                        // MenuProps={MenuProps}
                        className="form-control">
                        {this.state.diseaseList.map((lan) => {
                            return (
                                <MenuItem key={lan[0]}value={lan[0]} >
                                    {lan[1]}
                                </MenuItem>
                            )
                        })}
                        </Select>
                </div>
                    : null
                } 
                {   
                    this.state.type?
                   this.state.type.indexOf('3') === -1 
                    ? null 
                    :  <div className="col-lg-6 form-group">
                    <label htmlFor="">Cure</label>
                        <Select multiple
                        value={this.state.cures}
                        onChange={(e) =>  this.setState({
                          cures:e.target.value
                        })}
                        input={<Input id="select-multiple-chip" />}
                        // MenuProps={MenuProps}
                        className="form-control">
                        {this.state.diseaseList.map((lan) => {

                            return (
                                <MenuItem key={lan[0]}value={lan[0]} >
                                    {lan[1]}
                                </MenuItem>
                            )
                        })}
                        </Select>
                </div>
                    : null
                } 
                        </div>
                       
                     </div>
                  </div>
                  <div className="col-md-6 col-sm-6 col-sx-12 bg-white subs-hero-2">
                     <div className="subscribe">                    
                        <h1 className="text-dark">All Cures</h1>
                        <div className="h5">Sign up for our free <span>Disease/Cures</span> Weekly Newsletter</div><br/>
                        <div className="h5">Get <span>doctor-approved</span> health tips, news, and more</div>
                        <div className="form-group relative">
                           <div className="aaa">
                           <PhoneInput
      placeholder="Enter phone number"
      value={this.state.value}
      defaultCountry='in'
    
       onChange={(newValue) => {
                                 this.setState({
                                    value: newValue
                                 })
                              }}
                              />

                          {/* <input type="number" name="" onChange={this.setMobile}    className="form-control border rounded" placeholder="Please Share Your Mobile Number"/> */}
                              
                           </div>
                           <div>
                              {/* <a href="/#" className="subscribeBtn">Subscribe</a> */}
                                <button className="bcolor rounded py-2" onClick={( ) => {this.postSubscribtion()}}>
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
    );
  }
  }
}
 
export default Disease;
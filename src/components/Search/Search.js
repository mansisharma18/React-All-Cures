import React, { Component } from 'react' ;
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProfileTab from './ProfileTab';
import Cookies from 'js-cookie';
import Doct from "../../assets/img/doct.png";
import '../../assets/healthcare/css/main.css';
import '../../assets/healthcare/css/responsive.css';
import '../../assets/healthcare/css/animate.css';
import '../../assets/healthcare/icomoon/style.css';
import {Form ,Container } from 'react-bootstrap';
import axios from 'axios';
import { backendHost } from '../../api-config';
import Test from '../LandingPage/test'


class Search extends Component {
  constructor(props){
    super(props);
    const params = props.match.params
    this.state = {
      url: props.url,
      items: [],
      isLoaded: false,
      param: params,
      acPerm: Cookies.get('acPerm'),
      reload: false,
      speciality:[],
      articleValues:
      {
        diseaseConditionId: 1,
      }
    }
  }
  
  handleArticleChange = e => {
    this.setState({
        articleValues: { ...this.state.articleValues, [e.target.name]: e.target.value }
    });
}
  postSubscribtion() {
    
    axios.post(`${backendHost}/users/subscribe/7889761896`, {
    //   "articles_ids": selected.join(),
    //   "articles_ids_rejected": rejected.join()
    "nl_subscription_disease_id": 1,
    "nl_sub_type":1,
    "nl_subscription_cures_id":0,
    })
      .then(res => {
       
      })
      .catch(err => console.log(err))
 
    
  }

  fetchDoctors(city,lat,lon){
    if((city) && (this.state.param.name)) {
      document.title = `All Cures | ${city} | ${this.state.param.name}`
      fetch(`${backendHost}/SearchActionController?cmd=getResults&city=${city}&doctors=${this.state.param.name}&Latitude=${Cookies.get('latitude')}&Longitude=${Cookies.get('longitude')}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.map.DoctorDetails.myArrayList,
        })            
      });
    } else if((this.state.param.name) && (!city)) {

      document.title = `All Cures | ${this.state.param.name}`
      fetch(`${backendHost}/SearchActionController?cmd=getResults&doctors=${this.state.param.name}&Latitude=${Cookies.get('latitude')}&Longitude=${Cookies.get('longitude')}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.map.DoctorDetails.myArrayList,
        })            
      })
      .catch(err => 
        console.log(err)
    )
    } else if((city) && (!this.state.param.name)) {

      document.title = `All Cures | ${city}`
      fetch(`${backendHost}/SearchActionController?cmd=getResults&city=${city}&Latitude=${Cookies.get('latitude')}&Longitude=${Cookies.get('longitude')}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.map.DoctorDetails.myArrayList,
          acPerm: Cookies.get('acPerm'),
        })            
      })
      .catch(err => 
        console.log(err)
    )
    }
  }

  fetchDiseaseList(){
    Promise.all([
      fetch(`${backendHost}/article/all/table/disease_condition`).then(res => res.json())
      ])
      .then(diseaseData => {
        this.setState({
          speciality: diseaseData
      })
      .catch(err => 
        console.log(err)
    )
      })
  }
    // USE if statement
  componentDidMount() {
    this.fetchDoctors(this.props.match.params.city);
    this.fetchDiseaseList();  
  }

  componentDidUpdate(prevProps){
    if ( prevProps.match.params.city !== this.props.match.params.city){
      this.fetchDoctors(this.props.match.params.city)
    }
  }

  setModalShow =(action) => {
    this.setState({
      modalShow: action
    })
  }

  render() {
    
    var { isLoaded,items } = this.state;
      if(!isLoaded) {
        return (
        <>
          <Header history={this.props.history} url={this.props.match.url}/>
            <Container className="my-5 loading">
              <div className="loader ">
                <i className="fa fa-spinner fa-spin fa-6x" />
              </div>
            </Container>
          <Footer/>
        </>  
      );
      } else if(isLoaded && items.length === 0) {
          if(this.state.param.city){
            return(
              <>
              <Header history={this.props.history} url={this.props.match.url}/>
                <Container className="mt-5 my-5 loading">
                <h3 className="pt-5 text-center"><span className="icon-loupe "></span></h3>
                <h3 className="mt-3 text-center">We couldn't find any doctors matching '{this.state.param.city}'</h3>
                <p className="text-center">You could try again. </p>
                </Container>
              <Footer/>
              </>
            );
          } else if(this.state.param.name){
            return(
              <>
              <Header history={this.props.history}/>
                <Container className="mt-5 my-5">
                <h3 className="pt-5 text-center"><span className="icon-loupe "></span></h3>
                <h3 className="text-center">We couldn't find any doctors matching '{this.state.param.name}'</h3>
                <p className="text-center">You could try again. </p>
                </Container>
              <Footer/>
              </>
            );
          }
        
      }
      else if(isLoaded){
        return(
          <div>
            <Header history={this.props.history} url={this.props.match.url}/>
              <section className="physicians-tab">
                <div className="container">
                  <div className="row">
                    <div className="col-md-10 pd-0">
                      <div className="tab-nav">
                        <div className="comman-heading">
                          <h2>All Physicians</h2>
                        </div>
                        {/* Nav tabs */}
                        {/* <ul className="nav">
                          <li className="active"><a data-toggle="pill" href="#men">Men</a></li>
                          <li><a data-toggle="pill" href="#women">Women</a></li>
                          <li><a data-toggle="pill" href="#children">Children</a></li>
                          <li><a data-toggle="pill" href="#date">16 Sep, 2020</a></li>
                        </ul> */}
                        {/* <a href="javascriptvoid(0)" className="moreFilters color-white btn-bg">
                          More Filters
                        </a>  */}
                      </div>
                        {items.map((i) => ( 
                          <ProfileTab
                            rowno = {i.map.rowno}
                            docid= {i.map.doctorid}
                            name = {i.map.name}
                            pSpl = {i.map.primary_spl}
                            hospital = {i.map.hospital_affliated}
                            state = {i.map.state}
                            country = {i.map.country_code}
                            acPerm = {this.state.acPerm}
                            url = {this.props.url}
                            reload = {this.state.reload}
                            setModalShow = {this.setModalShow}
                            key = {i.map.doctorid}
                          />
                        ))}
                        <Test
                          show={this.state.modalShow}
                          onHide={() => this.setModalShow(false)}
                        />
                    </div>
                  </div>
                </div> 
              </section>


              <div>
         {/* <button i className=" newsletter-icon btn  newsletter_float" data-toggle="modal"data-target=".bd-example-modal-lg">
      Subscribe
     
            </button> */}
 
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
                  <div className="col-md-6 col-sm-6 col-sx-12">
                     <div className="subscribe">
                        <h1>Get along with us on</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue  turpis sollicitudin nulla finibus dignissim.</p>
                       <div>
                        <Form.Group className="col-md-6 float-left">
                                        <Form.Label>disease</Form.Label>
                                        <Form.Control as="select" name="diseaseConditionId" custom onChange={this.handleArticleChange} required>
                                        <option>Open this select menu</option>
                                        
                                            {this.state.speciality.map((i) => (  
                                              <options value={i[0]} key={i[0]}>{i[3]}</options>
                                            ))}
                                            
                                        </Form.Control>
                                    </Form.Group>
                                    </div>
                        <div className="form-group relative">
                           <div className="aaa">
                              <input type="text" name="" className="form-control"/>
                           </div>
                           <div>
                              {/* <a href="/#" className="subscribeBtn">Subscribe</a> */}
                              
                                
                                <button onClick={() => {this.postSubscribtion()}}>Submit</button>
                              
                             
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
export default Search; 
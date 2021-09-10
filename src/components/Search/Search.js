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
import Options from '../Article/Options';
import axios from 'axios';
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
    console.log(e.target.name + e.target.value)
}
  postSubscribtion() {
    
    // console.log(selected.join())
    // console.log(rejected.join())
    
    axios.post(`/users/subscribe/7889761896`, {
    //   "articles_ids": selected.join(),
    //   "articles_ids_rejected": rejected.join()
    "nl_subscription_disease_id": 1,
    "nl_sub_type":1,
    "nl_subscription_cures_id":0,
    })
      .then(res => {
        console.log(res)
       
      })
      .catch(err => console.log(err))
 
    
  }
    // USE if statement
  componentDidMount() {
    Promise.all([
    fetch('/article/all/table/disease_condition').then(res => res.json())
    ])
    .then(diseaseData => {
      this.setState({
     
        speciality: diseaseData
       
    });

    })
    
  
    if((this.state.param.city) && (this.state.param.name)) {
      document.title = `All Cures | ${this.state.param.city} | ${this.state.param.name}`
      fetch(`/SearchActionController?cmd=getResults&city=${this.state.param.city}&doctors=${this.state.param.name}&Latitude=&Longitude=`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.map.DoctorDetails.myArrayList,
        })            
      });
    } else if((this.state.param.name) && (!this.state.param.city)) {
      document.title = `All Cures | ${this.state.param.name}`
      fetch(`/SearchActionController?cmd=getResults&doctors=${this.state.param.name}&Latitude=32.7266&Longitude=74.8570`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.map.DoctorDetails.myArrayList,
        })            
      });
    } else if((this.state.param.city) && (!this.state.param.name)) {
      document.title = `All Cures | ${this.state.param.city}`
      fetch(`/SearchActionController?cmd=getResults&city=${this.state.param.city}&Latitude=32.7266&Longitude=74.8570`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json.map.DoctorDetails.myArrayList,
          acPerm: Cookies.get('acPerm'),
        })            
      });
    }
  }

  render() {
    
    var { isLoaded,items } = this.state;
      if(!isLoaded) {
        return (
        <>
          <Header url={this.props.match.url}/>
            <Container className="mt-5 my-5 loading">
              <h3 className="text-left">Loading...</h3>
            </Container>
          <Footer/>
        </>  
      );
      } else if(isLoaded && items.length === 0) {
          if(this.state.param.city){
            return(
              <>
              <Header url={this.props.match.url}/>
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
              <Header/>
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
            <Header url={this.props.match.url}/>
              <section className="physicians-tab">
                <div className="container">
                  <div className="row">
                    <div className="col-md-10 pd-0">
                      <div className="tab-nav">
                        <div className="comman-heading">
                          <h2>All Physicians</h2>
                        </div>
                        {/* Nav tabs */}
                        <ul className="nav">
                          <li className="active"><a data-toggle="pill" href="#men">Men</a></li>
                          <li><a data-toggle="pill" href="#women">Women</a></li>
                          <li><a data-toggle="pill" href="#children">Children</a></li>
                          <li><a data-toggle="pill" href="#date">16 Sep, 2020</a></li>
                        </ul>
                        <a href="javascriptvoid(0)" className="moreFilters color-white btn-bg">
                          More Filters
                        </a> 
                      </div>
                        {items.map((i) => ( 
                          <ProfileTab
                            docid= {i.map.doctorid}
                            name = {i.map.name}
                            pSpl = {i.map.primary_spl}
                            hospital = {i.map.hospital_affliated}
                            state = {i.map.state}
                            country = {i.map.country_code}
                            acPerm = {this.state.acPerm}
                            url = {this.props.url}
                            reload = {this.state.reload}
                          />
                        ))}
                    </div>
                  </div>
                </div> 
              </section>


              <div>
         <button i className=" newsletter-icon btn  newsletter_float" data-toggle="modal"data-target=".bd-example-modal-lg">
      Subscribe
     
            </button>
 
         </div>
<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
    <div class="modal-header">
        
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                                                <Options
                                                    value={i[0]}
                                                    name={i[3]}
                                                />
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
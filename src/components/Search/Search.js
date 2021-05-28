import React, { Component } from 'react' ;
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProfileTab from './ProfileTab';

import '../../assets/healthcare/css/main.css';
import '../../assets/healthcare/css/responsive.css';
import '../../assets/healthcare/css/animate.css';
import '../../assets/healthcare/icomoon/style.css';
class Search extends Component {
  constructor(props){
    super(props);
    const params = props.match.params
    this.state = {
      items: [],
      isLoaded: false,
      param: params
    }
  }
    
  componentDidMount(){
    // const city= '', name = '';
    console.log("Params: "+ JSON.stringify(this.state.param))
    // if(this.state.param.city){
    //   city = this.state.param.city
    // } else {
    //   city = ""
    // }
    // if(this.state.param.name){
    //   name = this.state.param.name
    // } else {
    //   name = ""
    // }
    fetch(`/SearchActionController?cmd=getResults&city=${this.state.param.city}&doctors=${this.state.param.name}&Latitude=&Longitude=`)
      .then(res => res.json())
      .then(json => {
        console.log(json.map.DoctorDetails.myArrayList);
        this.setState({
          isLoaded: true,
          items: json.map.DoctorDetails.myArrayList,
        })            
      });
  }

  render() {
    var { isLoaded,items } = this.state;
      if(!isLoaded) {
        console.log(items);
        return <div>Loading...</div>;
      }
      else if(isLoaded){
        console.log(items);
        return(
          <div>
            <Header/>
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
                          />
                        ))}
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
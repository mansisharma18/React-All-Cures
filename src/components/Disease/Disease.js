import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'

import {Container, Row, Col, Breadcrumb, Button } from "react-bootstrap";
import {Link } from 'react-router-dom'
import CenterWell from './CenterWell';
import Sidebar from "./leftMenu";
import SidebarRight from "./RightMenu";
import Wall from "../../assets/img/wall.jpg";
import { backendHost } from '../../api-config';

// import CenterWell from './CenterWell'
class Disease extends Component {
  constructor(props) {
    super(props);
    // const params = props.match.params
    this.state = { 
      items: [],
      isLoaded: false,
      param : this.props.match.params,
      disease: ''
    };
  }
  
  fetchBlog = () => {
    fetch(`${backendHost}/article/${this.props.match.params.id}`)
    // .then(res => JSON.parse(res))
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          isLoaded: true,
          items: json,
        });
        // document.title = `All Cures | ${json.data.title}`
      });
  }

  componentDidMount() {
    this.fetchBlog()
  }

  componentDidUpdate(prevProps){
    if ( prevProps.match.params.id !== this.props.match.params.id){
      console.log('prevpropsssssssss: ', prevProps.match.params.id, this.props.match.params.id )
      this.fetchBlog()
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
    console.log(items);    
    return (
      <>
      <Header history={this.props.history}/>
        <Container className="mt-5 my-5 loading">
          <h3 className="text-left">Loading...</h3>
        </Container>
      <Footer/>
      </>  
    );
  } else if(isLoaded){
    var artContent = items.content;
    console.log('article content: ', artContent)
    var a = JSON.parse(decodeURIComponent(artContent))
    console.log('decoded: ',a)
    var b = a.blocks
    // console.log("aaaaaaaaaa", a.blocks)
    return (
    <div>
      <Header history={this.props.history}/>
        <div className="ad-spac"><img src={Wall} height="200px" width="1900px"/></div>
        <Row>
          <Col md={2} id="sidebar-wrapper">      
            <Sidebar diseaseId={items.disease_condition_id} id={this.props.match.params.id}  name={items.dc_name} />
          </Col>
          <Col  md={7} id="page-content-wrapper" className="col-xs-12 pb-5">
            <div id="center-well" className="">
              <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>                                     
                <Breadcrumb.Item>
                  <Link to="/cures">
                    Blogs
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`/cures/${items.dc_name}`}>
                    {items.dc_name}
                  </Link>
                </Breadcrumb.Item>
                {/* <Breadcrumb.Item active>{items.title}</Breadcrumb.Item> */}
              </Breadcrumb>
              <div className="d-flex justify-content-end">
                <Link to={`/cures?c=9&dc=${items.disease_condition_id}`} className="mr-2 btn btn-info" >Indian</Link>
                <Link to={``} className="mr-2 btn btn-success" >Chinese</Link>
                <Link to={`/cures?c=10&dc=${items.disease_condition_id}`} className="btn btn-primary">Iranian</Link>
              </div>
              <div className="ml-5 h1 text-uppercase text-decoration-underline">{items.title}</div>
                {b.map((i) => (
                  <CenterWell
                    pageTitle = {items.title}
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
                  />
                ))}
            </div>
          </Col> 
          <Col id="sidebar-wrapper">      
            <SidebarRight title={items.title} history={this.props.history} />
          </Col>
        </Row>
      <Footer/>
    </div>
    );
  }
  }
}
 
export default Disease;
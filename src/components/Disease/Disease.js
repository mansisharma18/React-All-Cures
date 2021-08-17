import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'

import {Container, Row, Col, Breadcrumb } from "react-bootstrap";
import {Link } from 'react-router-dom'
import CenterWell from './CenterWell';
import Sidebar from "./leftMenu";
import SidebarRight from "./RightMenu";
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
    
  componentDidMount() {
    // console.log('Paramsssss '+ JSON.stringify(this.state.param))
    fetch(`/article/${this.props.match.params.id}`)
    // .then(res => JSON.parse(res))
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
  }
  componentDidUpdate(props) {
    // console.log('Paramsssss '+ JSON.stringify(this.state.param))
    fetch(`/article/${this.props.match.params.id}`)
    // .then(res => JSON.parse(res))
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
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
      <Header/>
        <Container className="mt-5 my-5 loading">
          <h3 className="text-left">Loading...</h3>
        </Container>
      <Footer/>
      </>  
    );
  } else if(isLoaded){
    var artContent = items.content;
    console.log(artContent)
    var a = JSON.parse(decodeURI(artContent))
    console.log(a)
    var b = a.blocks
    // console.log("aaaaaaaaaa", a.blocks)
    return (
    <div>
      <Header/>
        <div style={{height: "8rem", borderBottom: "1px solid #4b798d", borderTop: "1px solid #4b798d"}}></div>
        {/* <HeaderAd style={ {height: "10rem", display: "inline-block"}} /> */}
        {/* <Navbar  bg="blue" expand="lg">
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" variant="outline-success" onChange={this.handleChange} placeholder="Search" className="mr-sm-2" required aria-required="true"/>
              <Link
                className="btn btn-outline-success" 
                id="search"
                to={`/blogs/${this.state.disease}`}>
                  Search
              </Link>
            </Form>
          </Navbar.Collapse>
        </Navbar> */}
        <Row>
          <Col md={2} id="sidebar-wrapper">      
            <Sidebar diseaseId={items.disease_condition_id} name={items.dc_name} />
          </Col>
          <Col  md={7} id="page-content-wrapper" className="col-xs-12 pb-5">
            <div id="center-well" className="">
              <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>                                     
                <Breadcrumb.Item>
                  <Link to="/blogs">
                    Blogs
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to={`/blogs/${items.dc_name}`}>
                    {items.dc_name}
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item active>{items.title}</Breadcrumb.Item>
              </Breadcrumb>
                {b.map((i) => (
                  <CenterWell
                    content = {i.data.content}
                    type = {i.type}
                    text = {i.data.text}
                    title = {i.data.title}
                    message = {i.data.message}
                    source = {i.data.source}
                    embed = {i.data.embed}
                    caption = {i.data.caption}
                    alignment = {i.data.alignment}
                    url = {i.data.url}
                    item = {i.data.items}
                  />
                ))}
            </div>
          </Col> 
          <Col id="sidebar-wrapper">      
            <SidebarRight title={items.title}/>
          </Col>
        </Row>
      <Footer/>
    </div>
    );
  }
  }
}
 
export default Disease;
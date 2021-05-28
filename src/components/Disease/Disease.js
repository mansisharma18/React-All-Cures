import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'

import {Container, Row, Col, Card, Form, Button, Nav, Navbar, NavDropdown, FormControl,  } from "react-bootstrap";
import HeaderAd from './headerAd';
import Sidebar from "./leftMenu";
import SidebarRight from "./RightMenu";

class Disease extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                    <Header/>
                        <HeaderAd style={ {height: "10rem", display: "inline-block"}} />
                            <Navbar  bg="blue" expand="lg">
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
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                    <Button variant="outline-success">Search</Button>
                                    </Form>
                                </Navbar.Collapse>
                            </Navbar>
                            <Row>
                                <Col md={2} id="sidebar-wrapper">      
                                    <Sidebar />
                                </Col>
                                <Col  xs={8} id="page-content-wrapper">
                                </Col> 
                                <Col xs={2} id="sidebar-wrapper">      
                                    <SidebarRight />
                                </Col>
                            </Row>
                        <Footer/>
            </div>
        );
    }
}
 
export default Disease;
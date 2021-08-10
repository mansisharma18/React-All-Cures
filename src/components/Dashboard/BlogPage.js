import React, { Component } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'

import { Container } from "react-bootstrap";
import AllPost from './Allpost';
// import {Link } from 'react-router-dom'
// import CenterWell from './CenterWell';
// import Sidebar from "./leftMenu";
// import SidebarRight from "./RightMenu";
// import { render } from '@testing-library/react';

export default class Blogpage extends Component{
    constructor(props) {
        super(props);
        // const params = props.match.params
        this.state = { 
          items: [],
          isLoaded: false,
        //   param : params
        };
      }
    
      componentDidMount() {
        // console.log('Paramsssss '+ JSON.stringify(this.state.param))
        fetch(`/article/all`)
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
    render(){
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
        // console.log(items);
        // var artContent = items.content;
        // var a = JSON.parse(artContent)
        // console.log("article Content:", artContent)
        // var b = a.blocks
        // console.log("aaaaaaaaaa", a.blocks)
        return(
            <>
            <Header/>
            
                <div className="container my-4">
                    <h1 className="h1 text-center">Recent Posts</h1>
                    <div className="row" id="posts-container">
                    {items.map((i) => (
                        <AllPost
                            key={i[0]}
                            id = {i[0]}
                            title = {i[1]}
                            f_title = {i[2]}
                            w_title = {i[6]}
                        />
                    ))}
                    </div>
                </div>
            <Footer/>
            </>
        );
    }
}
}
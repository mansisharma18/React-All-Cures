import React, { useEffect, useState } from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import Post from './Posts'
import './style.css'
import { Container } from 'react-bootstrap';
import { backendHost } from '../../api-config';
import ArticleRating from "../ArticleRating";
import Cookies from 'js-cookie';

const Side = (props) => {
    const acPerm = Cookies.get("acPerm")

    const [isloaded, setisLoaded] = useState(true)
    const [items, setItems] = useState([])
    // function diseasePosts(){                     // For specific blogs like "/blogs/diabetes"
    //     fetch(`${backendHost}/isearch/${props.title}`)
    //       .then((res) => res.json())
    //       .then((json) => {                                  
    //           setisLoaded(true)
    //           setItems(json)
            
    //       });
    //   }
      function allPosts() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/article/allkv`)
          .then((res) => res.json())
          .then((json) => {
            setisLoaded(true)
            setItems(json.reverse())
          })
          .catch(err => 
            console.log(err)
        )
      }
      useEffect(() => {
          allPosts()
        // diseasePosts()
    }, [])
    // diseasePosts()
    if(!isloaded){
        return(
            <>
            <Container className="my-5 loading">
              <div className="loader ">
                <i className="fa fa-spinner fa-spin fa-3x" />
              </div>
            </Container>
        </>  
        )
    }
    else {
    return (
        <>

            <Nav className="col-xs-2  d-md-block sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
                
            <Nav.Item className="set-width">
                <div className="h3 pl-4 pb-3 font-weight-bold"><u>Recent Articles</u></div>
            {   items?
                    items.map((i, index) => index<10 && (
                        i.pubstatus_id === 3?                // Selects articles with publish status = 3 (Published)
                        <Post
                            id = {i.article_id}
                            title = {i.title}
                            f_title = {i.friendly_name}
                            w_title = {i.window_title}
                            type = {i.type}
                            country = {i.country_id}
                            history = {props.history}
                        />
                        : null
                    ))
                    : null
                }
            </Nav.Item>
            {/* {
                              acPerm? */}

            {/* <ArticleRating article_id={props.match.params.id} /> */}
            {/* : null
        } */}
          
            </Nav>
         
           
          
        </>
        );
    }
  };
  const SidebarRight = withRouter(Side);
  export default SidebarRight
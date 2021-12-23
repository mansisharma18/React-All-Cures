import React, { useEffect, useState } from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import Post from './Posts'
import AllPost from "../BlogPage/Allpost";
import './style.css'
import { Container } from 'react-bootstrap';
import { backendHost } from '../../api-config';
import ArticleRating from "../ArticleRating";
import Cookies from 'js-cookie';

const Side = (props) => {
    const acPerm = Cookies.get("acPerm")

    const [isloaded, setisLoaded] = useState(false)
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
            var temp = []
            json.forEach(i => {
              if(i.pubstatus_id === 3){
                temp.push(i)
              }
            });
            setItems(temp)
            setisLoaded(true)
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
            <div className="h3 pb-3"><u className="text-decoration-none">Recent Cures</u></div>
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
                
            <Nav.Item className="set-width"  id="dc-right-menu">
                <div className="h3 pb-3"><u className="text-decoration-none">Recent Cures</u></div>
                
            {   items?
                    items.map((i, index) => index<9 && (
                        <AllPost
                            id = {i.article_id}
                            title = {i.title}
                            f_title = {i.friendly_name}
                            w_title = {i.window_title}
                            type = {i.type}
                            content = {decodeURIComponent(i.content? 
                                        i.content.includes('%22%7D%7D%5D%7D')?
                                          i.content
                                          : i.content.replaceAll('%7D', '%22%7D%7D%5D%7D')
                                        : null)}
                            // type = {i.type}
                            published_date = {i.published_date}
                            over_allrating = {i.over_allrating}
                            // country = {i.country_id}
                            imgLocation={i.content_location}
                            history = {props.history}
                        />
                    ))
                    : null
                }
            </Nav.Item>
          
            </Nav>
         
           
          
        </>
        );
    }
  };
  const SidebarRight = withRouter(Side);
  export default SidebarRight
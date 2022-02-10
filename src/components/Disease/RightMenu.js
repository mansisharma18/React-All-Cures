import React, { useEffect, useState } from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import AllPost from "../BlogPage/Allpost";
import './style.css'
import { Container } from 'react-bootstrap';
import { backendHost } from '../../api-config';
import Heart from"../../assets/img/heart.png";

const Side = (props) => {

    const [isloaded, setisLoaded] = useState(false)
    const [items, setItems] = useState([])

    function diseasePosts(){                     // For specific blogs like "/blogs/diabetes"
        fetch(`${backendHost}/isearch/${props.dcName}`)
          .then((res) => res.json())
          .then((json) => {                                  
              setisLoaded(true)
              setItems(json)

            
            
          })
          .catch(err => {return
        }
        )
      }
      
      useEffect(() => {
          // allPosts()
        diseasePosts()
    }, [])
    // diseasePosts()
    if(!isloaded){
        return(
            <>
            <Container className="my-5 loading">
            <div className="h3 pb-3"><u className="text-decoration-none">{props.dcName} Cures</u></div>
            <div className="loader">
                <img src={Heart} alt="All Cures Logo" id="heart"/>
            </div>
            </Container>
        </>  
        )
    }
    else {var id = props.id
    console.log(id+"test");
    return (
        <>

            <Nav className="col-xs-2  d-md-block sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
                
            <Nav.Item className="set-width"  id="dc-right-menu">
                <div className="h4 pb-3"><u className="text-decoration-none">{props.dcName} Cures</u></div>
                
            {  
            
            items?
                    items.map((i, index) => (
                      i.article_id!=id?
                        <AllPost
                            rowno = {i.rowno}
                            key = {i.article_id.toString()}
                            id = {i.article_id}
                            title = {i.title}
                            f_title = {i.friendly_name}
                            w_title = {i.window_title}
                            type = {i.type}
                            // authorName={i.author_name}
                            content = {decodeURIComponent(i.content)}
                            // type = {i.type}
                            published_date = {i.published_date}
                            over_allrating = {i.over_allrating}
                            // country = {i.country_id}
                            imgLocation={i.content_location}
                            history = {props.history}
                        />:null
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
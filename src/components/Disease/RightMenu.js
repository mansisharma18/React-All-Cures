import React, { useEffect, useState } from "react";
import {Nav} from "react-bootstrap";
import { slice } from 'lodash'

import { withRouter } from "react-router";
import AllPost from "../BlogPage/Allpost";
import './style.css'
import { Container } from 'react-bootstrap';
import { backendHost } from '../../api-config';
import Heart from"../../assets/img/heart.png";
const Side = (props) => {

    const [isloaded, setisLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [post, setPost] = useState([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [index, setIndex] = useState(5)
  const [initial,setInitial]=useState(5)
  const initialPosts = slice(items, 0, index)

    function diseasePosts(){                     // For specific blogs like "/blogs/diabetes"
        fetch(`${backendHost}/isearch/limit/${props.dcName}?offset=0&limit=${initial}&&order=published_date:desc`)
          .then((res) => res.json())
          .then((json) => {    
            setInitial(initial+5)                              
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
                            // w_title = {i.window_title}
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

<div className="d-grid mt-3 mb-5 text-center">
      
            <button onClick={diseasePosts} type="button" className="btn btn-danger">
            Load More 
          </button>
         
      
      </div>
            </Nav.Item>
          
            </Nav>
         
           
          
        </>
        );
    }
  };
  const SidebarRight = withRouter(Side);
  export default SidebarRight

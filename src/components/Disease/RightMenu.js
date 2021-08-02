import React, { useEffect, useState } from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import AllPost from "../BlogPage/Allpost";
import './style.css'

const Side = (props) => {
    const [isloaded, setisLoaded] = useState(true)
    const [items, setItems] = useState([])
    function diseasePosts(){                     // For specific blogs like "/blogs/diabetes"
        fetch(`/isearch/arthritis`)     // NOT WORKING ERROR 500
          .then((res) => res.json())
          .then((json) => {                      
            console.log(json);
            
              setisLoaded(true)
              setItems(json)
            
          });
      }
      useEffect(() => {
          
        diseasePosts()
        if(items){
            console.log(items)
        }
    }, [])
    // diseasePosts()
    return (
        <>
    
            <Nav style={{background: '#71ddff', color: '#000'}} className="col-xs-2  d-md-block sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
                
            <Nav.Item className="set-width">
                <div className="h4 pl-3 pb-3"><u>Related to {props.title}</u></div>
            {   items?
                    items.map((i) => (
                        <AllPost
                            id = {i.article_id}
                            title = {i.title}
                            f_title = {i.friendly_name}
                            w_title = {i.window_title}
                            allPostsContent={() => this.allPosts()}
                        />
                        
                    ))
                    : null
                }
            </Nav.Item>
           
            </Nav>
          
        </>
        );
  };
  const SidebarRight = withRouter(Side);
  export default SidebarRight
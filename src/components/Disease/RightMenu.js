import React, { useEffect, useState } from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import AllPost from "../BlogPage/Allpost";
import './style.css'

const Side = (props) => {
    const [isloaded, setisLoaded] = useState(true)
    const [items, setItems] = useState([])
    function diseasePosts(){                     // For specific blogs like "/blogs/diabetes"
        fetch(`/isearch/art`)
          .then((res) => res.json())
          .then((json) => {
            // console.log(json);
            
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
            {   items?
                    items.map((i) => (
                        <AllPost
                            id = {i[0]}
                            title = {i[1]}
                            f_title = {i[2]}
                            w_title = {i[6]}
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
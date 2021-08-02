import React, {useState, useEffect} from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import AllPost from "../BlogPage/Allpost";
import './style.css'

const Side = props => {
    // const [isloaded, setisLoaded] = useState(true)
    const [items, setItems] = useState([])
    console.log('Propsssssssssssssssssss: ', props.diseaseId)
    function  allPosts() {                        // For all available blogs "/blogs"
        fetch(`/isearch/hierarchy/${props.diseaseId}`)
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            setItems(json)
          });
      }
      useEffect(() => {
        allPosts()
        if(items){
            console.log(items)
        }
    }, [])

    return (
        <>
    
            <Nav style={{background: '#71ddff', color: '#000'}}  className="col-xs-2  d-md-block sidebar"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item className="set-width pl-3">
                <div className="h3 pl-3 pb-3"><u>{props.title}</u></div>
                <ul>
            {   items?
                    items.map((i) => (
                        
                            // i.parent_dc_id === 0?
                            //     <div className="h5 pl-3">{i.dc_name}</div>
                            // : <div className="h6 pl-3">├──{i.dc_name}</div>
                        <li><a className="h5 pl-3 text-dark disease-left"> {i.dc_name}</a></li>
                        
                    ))
                    : null
                }
                </ul>
            </Nav.Item>
            </Nav>
          
        </>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar
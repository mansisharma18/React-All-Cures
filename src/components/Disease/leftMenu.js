import React, {useState, useEffect} from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
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
    
            <Nav className="d-md-block"
            activeKey="/home"
            onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item className="set-width pl-3">
                <div className="h3 pl-2 pb-1 pt-5 font-weight-bold"><u>Menu</u></div>
                <div className="guide mt-4">
                    <div className="h4 pl-2 font-weight-bold">{props.title} Guide</div>
                    {/* <div className="card"> */}
                    <div className=" menu-item">
                        <Link className="text-dark h6">Overview & Facts</Link>
                    </div>
                    <div className=" menu-item">
                        <Link className="text-dark h6">Symptoms & Diagnosis</Link>
                    </div>
                    <div className=" menu-item">
                        <Link className="text-dark h6">Treatment & Care</Link>
                    </div>
                    <div className=" menu-item">
                        <Link className="text-dark h6">Living with</Link>
                    </div>
                </div>
                <div className="related mt-5">
                    <div className="h4 pl-2 font-weight-bold">Related to {props.title}</div>
                    {/* <div className="card"> */}
                    <div className=" menu-item">
                        <Link className="text-dark h6">Overview & Facts</Link>
                    </div>
                    <div className=" menu-item">
                        <Link className="text-dark h6">Symptoms & Diagnosis</Link>
                    </div>
                    <div className=" menu-item">
                        <Link className="text-dark h6">Treatment & Care</Link>
                    </div>
                    <div className=" menu-item">
                        <Link className="text-dark h6">Living with</Link>
                    </div>
                </div>
                {/* </div> */}
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
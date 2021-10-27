import React, {useState, useEffect} from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import AllPost from "../BlogPage/Allpost";
import './style.css'
import { backendHost } from '../../api-config';
import ArticleComment from '../ArticleComment';

const Side = props => {
    // const [isloaded, setisLoaded] = useState(true)
    const [items, setItems] = useState([])
    const [commentItems, setCommentItems] = useState([])
    console.log('Propsssssssssssssssssss: ', props.diseaseId)
    function  allPosts() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/isearch/hierarchy/${props.diseaseId}`)
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            setItems(json)
          });
      }
      function  comments() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/rating/target/${props.id}/targettype/2`)
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            setCommentItems(json)
          });
      }
      useEffect(() => {
          comments()
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
                    <div className="h4 pl-2 font-weight-bold">{props.name} Guide</div>
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
                <div className="h4 pl-2 font-weight-bold">Related to {props.name}</div>
                {   
                    items?
                        items.map((i) => (
                            <div className=" menu-item">
                                <Link className="text-dark h6">{i.dc_name}</Link>
                            </div>
                        ))
                    : null
                }
                </div>
                {/* </ul> */}
            </Nav.Item>
            <ArticleComment refreshComments={comments} article_id={props.match.params.id}/>
            <h1>Comments </h1>
            {   
                    commentItems?
                    commentItems.map((i) => (
                            <div className=" menu-item">
                                <Link className="text-dark h3">{i.comments}</Link>
                            </div>
                        ))
                    : null
                }
            </Nav>
          
        </>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar
import React, {useState, useEffect} from "react";
import {Nav} from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import AllPost from "../BlogPage/Allpost";
import './style.css'
import { backendHost } from '../../api-config';
import ArticleComment from '../ArticleComment';
import Cookies from 'js-cookie';
import ArticleRating from "../ArticleRating";


const Side = props => {
    const [items, setItems] = useState([])
    const acPerm = Cookies.get("acPerm")
    const [commentItems, setCommentItems] = useState([])
    function  allPosts() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/isearch/hierarchy/${props.diseaseId}`)
          .then((res) => res.json())
          .then((json) => {
            setItems(json)
          });
      }
      function  comments() {                        // For all available blogs "/blogs"
        fetch(`${backendHost}/rating/target/${props.id}/targettype/2`)
          .then((res) => res.json())
          .then((json) => {
            setCommentItems(json)
          });
      }
      useEffect(() => {
          comments()
        allPosts()
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
                    {/* <div className=" menu-item">
                        <Link className="text-dark h6">Living with</Link>
                    </div> */}
                </div>
                <div className="related mt-5">
                {   
                    items.length != 0?
                        <>
                        <div className="h4 pl-2 font-weight-bold">Related to {props.name}</div>
                        {
                            items.map((i) => (
                                <div className=" menu-item" key={i.dc_id.toString()}>
                                    <Link to={`/cures/${i.dc_name}`} className="text-dark h6">{i.dc_name}</Link>
                                </div>
                            ))
                        }
                        </>
                    : null
                }
                </div>
                {/* </ul> */}
            </Nav.Item>
            {
                              acPerm?
                              <>
                              
                              <ArticleComment refreshComments={comments} article_id={props.match.params.id}/>
                              {/* <ArticleRating article_id={props.match.params.id} /> */}
                              {/* <h3>Comments </h3> */}
                              </>
                              : null
                            }
            
            
            {   
                    commentItems?
                    commentItems.map((i) => i.reviewed == 1?(
                            <div className="pl-4">
                                <div className="text-dark h5">{i.comments}</div>
                                <i className="text-capitalize float-right">{i.first_name} {i.last_name}</i>
                            </div>
                        )
                        :null
                        )
                    : null
                }
            </Nav>
          
        </>
        );
  };
  const Sidebar = withRouter(Side);
  export default Sidebar
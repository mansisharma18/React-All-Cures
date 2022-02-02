import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { backendHost } from '../../api-config';



const AllPost = ({ id, title, w_title, dis,pubstatus_id,article_id,create_date,published_date,type, content_type }) => {

    if (parseInt(dis) === 0) dis = true 
    else dis = false
    const [disable, setDisable] = React.useState(dis);
    const [deleteAlert, setAlert] = useState(false)
    
    const singlePostDelete = (id) => {
        console.log('delete',id);
        axios.delete(`${backendHost}/article/${id}`)
        .then(res => {
            singlePostDelete()
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 4000);
        })
        .then(err => {
            console.log(err);
        })
        .catch(err => 
            console.log(err)
        )
    }

    return (
        <>
 
<div class="row" id='' >
    
  <div class="col">  <Link to={ `/cure/${id}` }  className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-1 p-0">{article_id}</h5>
                </Link></div><br/><br/><br/>
  <div class="col-5">  <Link to={ `/cure/${id}` }  className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-1 p-0"> {title}</h5>
                </Link> </div>
  <div class="col"> {
                                pubstatus_id == 1?
                                    <div className="chip overview mr-2">Work In Progress</div>
                                    
                                : pubstatus_id == 2?
                                    <div className="chip symptoms mr-2">Reviewed
                                     </div>
                                : pubstatus_id == 3? 
                                    <div className="chip cure mr-2">Published </div>
                                : null
                            }</div>
  <div class="col"> <h5 className="card-title mb-1 p-0">{create_date}</h5></div>
  <div class="col"> <h5 className="card-title mb-1 p-0">{published_date}</h5></div>
  <div class="col"> 
     {
                deleteAlert?
                    <Alert variant="success" className="h6 mx-3">Deleted  successfully!!</Alert>
                    : null
            }
                
                <button className="btn btn-danger btn-sm mr-2" disabled={disable}  
                onClick={() => {
                    
                    const confirmBox = window.confirm(
                      "Do you really want to delete this Crumb?"
                    )
                    if (confirmBox === true) {
                        singlePostDelete(id)     }
                        setDisable(true)
                  }}> Delete</button></div>





</div>
    
        </>
    )

}

export default AllPost;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { backendHost } from '../../api-config';



const AllPost = ({ id, title, w_title, dis,pubstatus_id,article_id, content_type }) => {

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
        <div className="col-lg-12">
            
            <div className="card" style={{background: 'ghostwhite'}}>
                <div className="card-body">
                    
                        <div className="d-flex justify-content-between align-items-center">
                        
                        <div>
                      
                    
                            <Link to={ `/cure/${id}` }  className="d-flex justify-content-between align-items-center">
                                <h5 className="card-title mb-1 p-0">({article_id})  {title}</h5>
                            </Link>
                           
                            
                        </div>
                           {/* <div className="delete-edit-buttons">
                             {
                                pubstatus_id === 1?
                                    <div className="btn btn-info btn-sm">Work In Progress</div>
                                    
                                : pubstatus_id === 2?
                                    <div className="chip cure mr-2">Under Review
                                     </div>
                                : pubstatus_id === 3? 
                                    <div className="chip overview mr-2">Published </div>
                                : null
                            }

                      
                          
                             
                            
                        </div> */}
                        <div className="delete-edit-buttons">
                        {/* {
                                pubstatus_id === 1?
                                    <div className="btn btn-info btn-sm">Work In Progress</div>
                                    
                                : pubstatus_id === 2?
                                    <div className="btn btn-info btn-sm">Under Reviewsss
                                     </div>
                                : pubstatus_id === 3? 
                                    <div className="btn btn-info btn-sm">Published </div>
                                : null
                            } */}

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
                              }}> Delete</button>
                              
                               
                             
                            <Link className="btn btn-info btn-sm" to={ `/article/${id}`}>Edit</Link>
                           
                          
                        </div>
                        </div>                    
                </div>
            </div>
        </div>
    
        </>
    )

}

export default AllPost;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { backendHost } from '../../api-config';



const AllPost = ({ id, title, w_title, dis }) => {

    if (parseInt(dis) === 0) dis = true 
    else dis = false
    const [disable, setDisable] = React.useState(dis);
    const [deleteAlert, setAlert] = useState(false)
    
    const singlePostDelete = (id) => {
        axios.delete(`${backendHost}/article/${id}`)
        .then(res => {
            singlePostDelete()
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 4000);
        })
        .then(err => {
            return
        })
        .catch(err => {
            return
            }
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
                                <h5 className="card-title mb-1 p-0">{title}</h5>
                            </Link>
                            <div className="card-info">
                                <div className="h6">{w_title}</div>
                            </div>
                        </div>
                        <div className="delete-edit-buttons">
                        <Link className="btn btn-info btn-sm" to={ `/article/${id}`}>Edit</Link>

                        

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

                                    
                              }}> Delete</button>
                     : <button className="col-md-4 btn btn-dark" disabled>Delete</button>

                              {/* {
                                i.promo_active === 1?
                                    <button onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Are you sure?"
                                        )
                                        if (confirmBox === true) {
                                            PromoDelete(i.promo_id)
                                        }
                                    }} className="col-md-4 btn btn-dark">De-activate</button>
                                    : <button className="col-md-4 btn btn-dark" disabled>De-activate</button>
                            } */}
                             
                           
                            
                        </div>
                        </div>                    
                </div>
            </div>
        </div>
    
        </>
    )

}

export default AllPost;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { backendHost } from '../../api-config';

const ListArticle = ({id, title, f_title, w_title, country, type, pubstatus_id, dis}) => {

    if (dis==0) dis = true 
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
            console.log(err);
        })
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
                             {
                                pubstatus_id === 1?
                                    <div className="chip overview mr-2">Work In Progress</div>
                                    
                                : pubstatus_id === 2?
                                    <div className="chip symptoms mr-2">Under Review
                                     </div>
                                : pubstatus_id === 3? 
                                    <div className="chip cure mr-2">Publish </div>
                                : null
                            }

                        {
                            deleteAlert?
                                <Alert variant="success" className="h6 mx-3">Deleted  successfully!!</Alert>
                                : null
                        }
                            {
                                pubstatus_id === 1 || pubstatus_id === 2 || pubstatus_id === 3  ?
                            <button className="btn btn-danger btn-sm mr-2" disabled={disable}  
                            onClick={() => {
                                
                                const confirmBox = window.confirm(
                                  "Do you really want to delete this Crumb?"
                                )
                                if (confirmBox === true) {
                                    singlePostDelete(id)     }
                                    setDisable(true)
                              }}> Delete</button>
                              
                              : <button className="btn btn-danger btn-sm mr-2" disabled>Delete</button>
                            }
                             
                            <Link className="btn btn-info btn-sm" to={ `/article/${id}`}>Edit</Link>
                            
                        </div>
                        </div>                    
                </div>
            </div>
        </div>
    
        </>
    )

}
export default ListArticle;


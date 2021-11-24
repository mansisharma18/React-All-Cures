import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { backendHost } from '../../api-config';

const ListArticle = ({id, title, f_title, w_title, country, type, pubstatus_id, dis}) => {
console.log('id: ', id)

if (dis==0) dis = true 
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
}

        return (
            <>
            <div style={{width:"100%"}} >
                <div  >
                    {/* <div className="card-body"> */}
                            
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                    <Link to={ `/cure/${id}` }  className="d-flex justify-content-between align-items-center">
                                        <div className="card-title">{title}</div>
                                    </Link>
                                </div>
                                <div>
                                {/* <div className="chip overview mr-2">Work In Progress</div>
                             <div className="chip cure mr-2">Review</div> */}
                                {
                                pubstatus_id == '1'?
                                    <div className="chip overview mr-2">Work In Progress</div>
                                    
                                : pubstatus_id == '2'?
                                    <div className="chip symptoms mr-2">Reviewed</div>
                                : pubstatus_id == '3'? 
                                    <div className="chip cure mr-2">Published </div>
                                : null
                            }
                            
                            
                            {   country?
                                    country !== 0?
                                        <div className="chip country">{country}</div>
                                        : null
                                    : null
                            }



                               
                                     

                                {
                                    deleteAlert?
                                        <Alert variant="success" className="h6 mx-3">Deleted  successfully!!</Alert>
                                        : null
                                }
                                     {
                                pubstatus_id == '2'?
                                    <Link className="chip symptoms mr-2" disabled={disable}  
                                    onClick={() => {
                                        
                                        const confirmBox = window.confirm(
                                        "Do you really want to delete this Crumb?"
                                        )
                                        if (confirmBox === true) {
                                            singlePostDelete(id)     }
                                            setDisable(true)
                                    }}> Delete</Link>
                                    : null
                                }
                                      {
                                pubstatus_id == '2'?
                                    
                                    
                                    <Link className="chip symptoms mr-2" to={ `/article/${id}`}>Edit</Link>
                                    : null
                                }
                              

                            </div>
                            </div>
                        
                        <div className="card-info">
                            <h4>{w_title}</h4><hr/>
                        </div>
                    {/* </div> */}
                </div>
            </div>
        
            </>
        )    

}
export default ListArticle;


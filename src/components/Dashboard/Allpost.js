import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Rating from '../StarRating';
import BlogAllPost from './BlogAllPost'
import { Dropdown, Button, DropdownButton, Nav, Modal, Alert} from 'react-bootstrap';

const AllPost = ({id, article_id,title, f_title, w_title,dis}) => {

    if (dis==0) dis = true 
    else dis = false
    const [disable, setDisable] = React.useState(dis);
    console.log('dis'+dis)
    const [deleteAlert, setAlert] = useState(false)
    
    const singlePostDelete = (id) => {
        console.log('delete',id);
        axios.delete(`/article/${id}`)
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
                        <Link to={ `/blog/${id}` }  className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title mb-1 p-0">{title}</h5>
                        </Link>
                        <div className="card-info">
                        <div className="h6">{f_title}</div>
                            <div className="h6">{w_title}</div>

                    </div>
                        </div>
                        <div className="delete-edit-buttons">

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
                    
                    
                    {/* <Rating /> */}
                </div>
            </div>
        </div>
    
        </>
    )

}

// SHOW ALERT

function SubmitAlert(props) {
    console.log('Submit ALert', props.ShowSubmitAlert)
    if(props.ShowSubmitAlert) {
        return(
            <Alert className="bg-green">Subscribe has been saved successfully!</Alert>
        );
    }
 }
 
 // Show Error Alert
 
 function SubmitError(props) {
    console.log('Submit ALert', props.ShowErrorAlert)
    if(props.ShowErrorAlert) {
        return(
            <Alert className="bg-red">Some Error occured!</Alert>
        );
    }
 }
   


export default AllPost;
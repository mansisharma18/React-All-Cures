import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllPost = ({id, title, f_title, w_title,allPostsContent}) => {

    
    const singlePostDelete = (postId) => {
        
        console.log('delete',postId);
        axios.delete(`/article/${postId}`)
        .then(res => {
            console.log(res);
            allPostsContent()
        })
        .then(err => {
            console.log(err);
        })
    }




    return (
        <>
        <div className="col-lg-12">
            <div className="card m-2" style={{background: 'ghostwhite'}}>
                <div className="card-body">
                    
                        <div className="d-flex justify-content-between align-items-center">
                        <div>
                        <Link to={ `/blog/${id}` }  className="d-flex justify-content-between align-items-center">
                            <h5 className="card-title m-0 p-0">{title}</h5>
                        </Link>
                        </div>
                        <div className="delete-edit-buttons">
                            <button className="btn btn-danger btn-sm mr-2"
                            onClick={() => {
                                const confirmBox = window.confirm(
                                  "Do you really want to delete this Crumb?"
                                )
                                if (confirmBox === true) {
                                    singlePostDelete(id)                                }
                              }}> Delete</button>
                            <Link className="btn btn-info btn-sm" to={ `/editPost/${id}`}>Edit</Link>
                        </div>
                        </div>
                    
                    <div className="card-info">
                        <h6 className="card-subtitle mb-2 text-muted"></h6>
                        <div>{f_title}</div>
                        <div>{w_title}</div>
                    </div>
                </div>
            </div>
        </div>
    
        </>
    )

}


   


export default AllPost;
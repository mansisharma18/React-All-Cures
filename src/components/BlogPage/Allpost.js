import React from 'react';
import { Link } from 'react-router-dom';

const AllPost = ({id, title, f_title, w_title}) => {
    console.log('id: ', id)
        return (
            <>
            <div className="col-lg-12">
                <div className="card m-2" style={{background: 'ghostwhite'}}>
                    <div className="card-body">
                        
                            <div className="d-flex justify-content-between align-items-center">
                            <div>
                            <Link to={ `/blog/${id}` }  className="d-flex justify-content-between align-items-center">
                                
                            </Link>
                            </div>
                            
                            </div>
                        
                        <div className="card-info">
                            
                        <div className="pb-2"><span className="font-weight-bold">Title:</span> {title}</div>
                        <div className="pb-2"><span className="font-weight-bold">Friendlytitle:</span> {f_title}</div>
                        <div className="pb-2"><span className="font-weight-bold">Window Title:</span> {w_title}</div>
                        </div>
                    </div>
                </div>
            </div>
        
            </>
        )    

}


   


export default AllPost;
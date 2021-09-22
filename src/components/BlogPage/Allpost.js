import React from 'react';
import { Link } from 'react-router-dom';

const AllPost = ({id, title, f_title, w_title}) => {
    console.log('id: ', id)
        return (
            <>
            <div >
                <div  >
                    {/* <div className="card-body"> */}
                        
                            <div className="d-flex justify-content-between align-items-center">
                            <div>
                            <Link to={ `/blog/${id}` }  className="d-flex justify-content-between align-items-center">
                            <div className="pb-2"> {title}</div>
                            </Link>
                            </div>
                            
                            </div>
                        
                        <div >
                         
                        <div className="pb-2">{w_title}</div>
                        </div>
                    {/* </div> */}
                </div>
            </div>
        
            </>
        )    

}


   


export default AllPost;
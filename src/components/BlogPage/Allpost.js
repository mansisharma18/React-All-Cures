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
<<<<<<< HEAD
                                <div className="card-title h4 m-0 p-0">{title}</div>
=======
                            <div className="pb-2"> {title}</div>
>>>>>>> 4952af24c172074819d78ad27dccafd2af138d9c
                            </Link>
                            </div>
                            
                            </div>
                        
<<<<<<< HEAD
                        <div className="card-info">
                            <h4>{f_title}</h4>
                            <h4>{w_title}</h4>
=======
                        <div >
                         
                        <div className="pb-2">{w_title}</div>
>>>>>>> 4952af24c172074819d78ad27dccafd2af138d9c
                        </div>
                    {/* </div> */}
                </div>
            </div>
        
            </>
        )    

}
export default AllPost;
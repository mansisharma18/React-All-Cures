import React from 'react';

const Post = ({id, title, f_title, w_title, history}) => {
        return (
            <>
            <div style={{width:"120%"}} >
                <div className="ml-4" >
                    {/* <div className="card-body"> */}
                        
                            <div className="justify-content-between align-items-center mb-2">
                                <div className="card">
                                    <button onClick={(e) => history.push(`/cure/${id}`)} className="btn justify-content-between align-items-center">
                                        <div className="card-title h5 mb-3">{title}</div>
                                        <div className="h6">{w_title}</div>

                                    </button>
                                </div>
                            </div>
                        
                        {/* <div className="card-info">
                            <hr/>
                        </div> */}
                    {/* </div> */}
                </div>
            </div>
        
            </>
        )    

}
export default Post;
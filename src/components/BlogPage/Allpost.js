import React from 'react';
import { Link } from 'react-router-dom';

const AllPost = ({id, title, f_title, w_title, country, type}) => {
        return (
            <>
            <div style={{width:"100%"}} key={id.toString()}>
                <div  >
                    {/* <div className="card-body"> */}
                            
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                    <Link to={ `/cure/${id}` }  className="d-flex justify-content-between align-items-center">
                                        <div className="card-title">{title}</div>
                                    </Link>
                                </div>
                                <div>
                                {
                                type.includes('1') || type === '1'?
                                    <div className="chip overview mr-2">Overview</div>
                                : null
                                //     <div className="chip cure mr-2">Cures</div>
                                // : type === '3'?
                                //     <div className="chip symptoms mr-2">Symptoms</div>
                                // : null
                            }
                            {
                                type.includes('2') || type === '2'?
                                    <div className="chip cure mr-2">Cures</div>
                                    : null
                            }
                            {
                                type.includes('3') || type === '3'?
                                <div className="chip symptoms mr-2">Symptoms</div>
                                    : null
                            }
                            {   
                                country !== 0?
                                    country === 9?
                                        <div className ="chip country">India</div>
                                        : country === 10?
                                            <div className="chip country">Iran</div>
                                            :null
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
export default AllPost;
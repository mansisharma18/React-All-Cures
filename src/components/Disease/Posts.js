import React from 'react';

const Post = ({id, title, f_title, w_title, history, type, country, published_date}) => {
        return (
            <>
            <div style={{width:"95%"}} >
                <div className="ml-3" >
                    {/* <div className="card-body"> */}
                        
                            <div className="justify-content-between align-items-center mb-2">
                                <div className="card">
                                    <button onClick={(e) => history.push(`/cure/${id}`)} className="btn d-flex justify-content-between align-items-center">
                                        <div>
                                            <div className="card-title h6 mb-1 font-weight-bold text-capitalize">{title}</div>
                                            <div className="h7 text-muted">{w_title}</div>
                                            <div>
                                                Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Suspen disse in scele risque magna,  sed rutrum urna tincidunt.
                                            </div>
                                            <div className="h7 text-muted text-left">Published on: {published_date}</div>
                                        </div>
                                         {/* <div>
                                        {
                                type === '1'?
                                    <div className="chip overview mr-2">Overview</div>
                                : type === '2'?
                                    <div className="chip cure mr-2">Cures</div>
                                : type === '3'?
                                    <div className="chip symptoms mr-2">Symptoms</div>
                                : null
                            }
                            </div> */}
                            {/*
                            {   
                                country !== 0?
                                    country === 9?
                                        <div className ="chip country">India</div>
                                        : country === 10?
                                            <div className="chip country">Iran</div>
                                            :null
                                        : null
                            }
                                        </div> */}
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
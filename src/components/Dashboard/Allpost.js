import React from 'react';
import { Link } from 'react-router-dom';
const AllPost = ({id, title, f_title, w_title}) => (
    <>
    <div className="col-lg-4 cold-xs-8">
        <div className="card m-2" style={{background: 'ghostwhite'}}>
            <div className="card-body">
                <Link to={ `/blogs/${id}` }  className="d-flex justify-content-between">
                    <div>
                    {/* <h5 className="card-title">{title}</h5> */}
                    <div>
                        <button className="btn btn-danger btn-sm">Delete</button>
                    </div>
                    </div>
                </Link>
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

export default AllPost;
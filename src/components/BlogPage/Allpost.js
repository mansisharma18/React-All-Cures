import React from 'react';
import { Link } from 'react-router-dom';
const AllPost = ({id, title, f_title, w_title}) => (
    <>
    <div className="col-lg-4 cold-xs-8">
        <div className="card m-2" style={{background: 'ghostwhite'}}>
            <div className="card-body">
                <Link to={ `/blogs/${id}` } >
                    <h5 className="card-title">{title}</h5>
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
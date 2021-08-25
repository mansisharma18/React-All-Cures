import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
function GetPromo(){
    const [promoData, setPromo] = useState([])
    const fetchPromo = (e) => {
        axios.get(`/promo/all`)
        .then(res => {
            console.log(res.data)
            setPromo(res.data)
        })
        .catch(res => console.log(res))
    }
    useEffect(() => {
        fetchPromo();
    }, [])

    const PromoDelete = (promoId) => {
        axios.delete(`/promo/${promoId}`)
        .then(res => {
            fetchPromo()
        })
        .catch(err => {
            console.log(err);
        })
    }

    return(
        <>
            <div className="container mb-4">
                <div className="row">
            {
                promoData?
                promoData.map(i => {
                    return(
                        <div className="card col-md-5 mt-5 mx-3 border p-3 h6">
                            <div className="card-title h4"><span className="font-weight-bold">Promo Code: </span>{i.promo_code}</div>
                            {/* <div className="card-body"> */}
                                <div className="pb-2"><span className="font-weight-bold">Start Date:</span> {i.promo_start_datetime.split('T')[0]}</div>
                                <div className="pb-2"><span className="font-weight-bold">End Date:</span> {i.promo_end_datetime.split('T')[0]}</div>
                                <div className="pb-2"><span className="font-weight-bold">Maximum Limit:</span> {i.promo_max_limit}</div>
                                <div className="pb-2"><span className="font-weight-bold">Last Update:</span> {i.promo_updated_date}</div>
                                <div><span className="font-weight-bold">Status:</span> 
                                {
                                    i.promo_active === 1?
                                        <span> Active</span>
                                        : <span> Not Active</span>
                                }
                                </div>
                            {/* </div> */}
                            <div className="row mx-1 my-2">
                            <Link to={`/dashboard?edit=${i.promo_id}`} className="col-md-3 btn mr-2" style={{backgroundColor: '#9289be', color: '#fff'}}>Edit</Link>
                            {
                                i.promo_active === 1?
                                    <button onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Are you sure?"
                                        )
                                        if (confirmBox === true) {
                                            PromoDelete(i.promo_id)
                                        }
                                    }} className="col-md-4 btn btn-dark">De-activate</button>
                                    : <button className="col-md-4 btn btn-dark" disabled>De-activate</button>
                            }
                            
                            </div>
                        </div>
                    )
                })
                : null
            }
            </div>
            </div>
        </>
        // <div>khbkdasdljab</div>
    )
}

export default GetPromo;
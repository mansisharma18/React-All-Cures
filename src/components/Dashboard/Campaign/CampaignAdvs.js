import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { backendHost } from '../../../api-config';


import axios from 'axios';



const AllAdds = () => {

    const [allAdds, setAllAdds] = useState([])
    const fetchad= (e) => {
        axios.get(`${backendHost}/sponsored/get/all/ads`)
        .then(res => {
            setAllAdds(res.data)
        })
        .catch(res => {return})
    }
    useEffect(() => {
        document.title = "All Cures | Dashboard | Sponsered"
        fetchad();
    }, [])

    const PromoDelete = (promoId) => {
        axios.delete(`${backendHost}/promo/${promoId}`)
        .then(res => {
            fetchad()
        })
        .catch(err => {
            return;
        })
    }
  return (
    <>
      <div className="container mb-4">
                <div className="row">
            {
                allAdds?
                allAdds.map(i => {
                    return(
                        <div className="card col-md-5 mt-5 mx-3 border p-3 h6">
                            <div className="card-title h4"><span className="font-weight-bold">Ad Title: </span>{i.AdTitle}</div>
                            {/* <div className="card-body"> */}
                               
                                <div className="pb-2"><span className="font-weight-bold">Ad Description:</span> {i.AdDescription}</div>
                                <div className="pb-2"><span className="font-weight-bold">Ad Count:</span> {i.AdCount}</div>
                               <div className="pb-2"><span className="font-weight-bold">Ad Delivered:</span> {i.AdDelivered}</div>
                                <div className="pb-2"><span className="font-weight-bold"></span><img src= {i.ImageLocation}/></div>
                                <div className="pb-2"><span className="font-weight-bold">Start Date:</span> {i.StartDate}</div>
                                <div className="pb-2"><span className="font-weight-bold">End Date:</span> {i.EndDate}</div>
                                <div className="pb-2"><span className="font-weight-bold">Created On::</span> {i.CreateDate}</div>
                                <div className="pb-2"><span className="font-weight-bold">Last Updated:</span> {i.LastUpdatedDate}</div>
                                <div className="pb-2"><span className="font-weight-bold">Review Status:</span> {i.ReviewStatus}</div>
                                <div className="pb-2"><span className="font-weight-bold">Payment Status:</span> {i.PaymentStatus}</div>
                               
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
  )
}

export default AllAdds
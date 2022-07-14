import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import { backendHost } from '../../../api-config';

import axios from 'axios';
function GetSubscription ({ subscription_id})  {
    const [subscription, setSubscription] = useState([])
    const [deleteAlert, setAlert] = useState(false)

    const fetchSubscription = (e) => {
        axios.get(`${backendHost}/subscription/get`)
        .then(res => {
            setSubscription(res.data)
        })
        .catch(res => {return})
    }
    useEffect(() => {
        document.title = "All Cures | Dashboard | Subscription"
        fetchSubscription();
    }, [])

    const SubscriptionDelete = (id) => {
        axios.delete(`${backendHost}/subscription/delete/${id}`)
        .then(res => {
            fetchSubscription()
        })
        .catch(err => {
            console.log("errrrrrrorrrrrrrrrrrrrrrrrr",err)
            return;
        })
    }

   
   

    return(
        <>
            <div className="container mb-4">
                <div className="row">
            {
                subscription?
                subscription.map(i => {
                    return(
                        <div className="card col-md-5 mt-5 mx-3 border p-3 h6">
                            <div className="card-title h4"><span className="font-weight-bold">Subscription Details: </span>{i.subscription_details}</div>
                            {/* <div className="card-body"> */}
                                <div className="pb-2"><span className="font-weight-bold">Start Date:</span> {i.subscription_starttime.split('T')[0]}</div>
                                <div className="pb-2"><span className="font-weight-bold">End Date:</span> {i.subscription_endtime.split('T')[0]}</div>
                                {/* <div className="pb-2"><span className="font-weight-bold">Last Update:</span> {i.subscription_updatedtime.split('T')[0]}</div> */}
                                <div className="pb-2"><span className="font-weight-bold">Price Amount :</span> {i.price_id}</div>

                                <div><span className="font-weight-bold">Subscription Status:</span> 
                                {
                                    i.subscription_status=== 1?
                                        <span> Active</span>
                                        : <span> Not Active</span>
                                }
                                </div>
                            {/* </div> */}
                            <div className="row mx-1 my-2">
                            <Link to={`/dashboard?editsubscription=${i.subscription_id}`} className="col-md-3 btn mr-2" style={{backgroundColor: '#9289be', color: '#fff'}}>Edit</Link>
                            {
                                i.subscription_status === 1?
                                    <button onClick={() => {
                                        const confirmBox = window.confirm(
                                            "Are you sure?"
                                        )
                                        if (confirmBox === true) {
                                            SubscriptionDelete(i.subscription_id)
                                        }
                                    }} className="col-md-4 btn btn-dark">Delete</button>
                                    : <button className="col-md-4 btn btn-dark" disabled>Deleted</button>
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

export default GetSubscription;
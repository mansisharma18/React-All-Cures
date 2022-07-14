import React, {useState, useEffect} from 'react';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import {useLocation} from "react-router-dom";
import history from '../../history';
import { userId } from '../../UserId'
import { backendHost } from '../../../api-config';


export default function UpdateSubscription(props){
   

    const [startDate, setStart] = useState(Date)
    const [endDate, setEnd] = useState(Date)
    const [details, setDetails] = useState()
    const [status, setStatus] = useState()
    const [price,setPrice] = useState()
    const [prices,setPrices] = useState([])


    const [submitAlert, setAlert] = useState(false)
    const [subscriptionData, setSubscription] = useState([])

    
    const search = useLocation().search;  
    const id = new URLSearchParams(search).get('editsubscription');

    const fetchSubscription = (e) => {
        axios.get(`${backendHost}/subscription/${id}`)
        .then(res => {
            setSubscription(res.data)
            setDetails(res.data[0].subscription_details)
            setStatus(res.data[0].subscription_status)

            setStart(res.data[0].subscription_starttime.split('T')[0])
            setEnd(res.data[0].subscription_endtime.split('T')[0])
            setPrice(res.data[0].price_id)
        })
        .catch(res => {return})
    }
    const getPrice = () => {
        axios.get(`${backendHost}/article/all/table/price_table`)
        .then(res => {
            
            setPrices(res.data)
        })
        .catch(err => 
            console.log(err)
        )
    }

    useEffect(() => {
        document.title = "All Cures | Dashboard | Update Subscription"
        fetchSubscription();
        getPrice()
        // eslint-disable-next-line
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
        axios.put(`${backendHost}/subscription/update/${id}`, {
        
            "subscription_details":details ,
            "subscription_status":status.toString() ,
            "subscription_starttime": startDate,
            "subscription_endtime": endDate,
            "price_id": price.toString(),
        })
        .then(res => {
            history.back()
        })
        .catch(res => {return})
    }

    return(
            <div className="container">
                <div className="card my-3">
                    <div className="card-title h3 text-center py-2 border-bottom">Update Subscription Details</div>
                    <form onSubmit={submitForm}>
                        <div className="row m-4">
                        
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Subscription Start Date</Form.Label>
                            <Form.Control type="Date" Value={startDate} onChange={(e) => setStart(e.target.value)} name=""
                            placeholder="Start Date here..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Subscription End Date</Form.Label>
                            <Form.Control Value={endDate} onChange={(e) => setEnd(e.target.value)} type="Date" name=""
                            placeholder="Start Date here..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Subscription Details</Form.Label>
                            <Form.Control type="text" name="" value={details} onChange={(e) => setDetails(e.target.value)} 
                            placeholder="Subscription Details..." required/>
                        </Form.Group>

                       

                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Subscription Active Status</Form.Label>
                            <Form.Control type="text" name="" value={status} onChange={e => setStatus(e.target.value)}
                             placeholder="1 for active & 0 for not-active..." required/>
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Subscription PriceID</Form.Label>
                            <Form.Control value={price} onChange={(e) => setPrice(e.target.value)} type="text" name=""
                            placeholder="Subscription PriceID..." required/>
                            
                        </Form.Group>

                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter Price ID</label>
<select name="state" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price Id" required="" className="form-control">
<option>Select Price Id</option>
    {prices.map((c) => {
        
        return (
            <option value={c[1]}>{c[2]}</option>
        )
    })}
</select>
                        </Form.Group>

                        </div>
                        {
                            submitAlert?
                                <Alert variant="success" className="h6 mx-3">Updated Successfully!!</Alert>
                                : null
                        }
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>
                </div>
    );
    
}
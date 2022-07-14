import React, { useState, useEffect } from 'react';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { backendHost } from '../../../api-config';
import { userId } from '../../UserId'

function  Master(props) {
    const [id, setId] = useState('')
    const [startDate, setStart] = useState(Date)
    const [endDate, setEnd] = useState(Date)
    const [details, setDetails] = useState()
    const [status, setStatus] = useState()
    const [priceId,setPriceId] = useState()
    const [price,setPrice] = useState([])
    const [submitAlert, setAlert] = useState(false)
    

    const getPrice = () => {
        axios.get(`${backendHost}/article/all/table/price_table`)
        .then(res => {
            
            setPrice(res.data)
        })
        .catch(err => 
            console.log(err)
        )
    }

    const submitForm = (e) => {
        e.preventDefault();
        axios.post(`${backendHost}/subscription/create`, {
            // "subscription_id": id,
            "subscription_details":details ,
            "subscription_status":status ,
            "subscription_starttime": startDate,
            "subscription_endtime": endDate,
            "price_id": priceId,
        })
        .then(res => {
            setAlert(true)
            setId('')
            setStart('')
            setEnd('')
            setDetails('')
            setPriceId('')
            setStatus('')
            setTimeout(() => {
                setAlert(false)
            }, 4000);
        })
        .catch(res => {return})
    }
    useEffect(() => {
        getPrice()
       
    
   }, []) 
    return(
        <>
            {/* <Header/> */}
            <div className="promo-page">
                <div className="container">
                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom"> Create Subsciption Type</div>
                        <form onSubmit={submitForm}>
                            <div className="row m-4">
                      
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Subscription Start Date</Form.Label>
                            <Form.Control type="Date" value={startDate} onChange={(e) => setStart(e.target.value)} name=""
                            placeholder="Start Date here..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Subscription End Date</Form.Label>
                            <Form.Control value={endDate} onChange={(e) => setEnd(e.target.value)} type="Date" name=""
                            placeholder="Start Date here..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Subscription Details</Form.Label>
                            <Form.Control type="text" name="" value={details} onChange={(e) => setDetails(e.target.value)} 
                            placeholder="Subsciption Details..." required/>
                        </Form.Group>
                        
                        <div className="col-md-6 float-left" style={{zIndex: 2}}>
                    <label htmlFor="">Subscription Status</label>
                    <select name="" value={status}  onChange={(e) => setStatus(e.target.value)} className="form-control" id="">
                    <option>Open this select menu</option>
                        <option value="1">Active</option>
                        <option value="0">Not Active</option>
                       
                    </select>
                </div>


                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                        <label htmlFor="">Enter Price ID</label>
<select name="state" value={priceId} onChange={(e) => setPriceId(e.target.value)} placeholder="Enter Price Id" required="" className="form-control">
<option>Select Price Id</option>
    {price.map((c) => {
        
        return (
            <option value={c[1]}>{c[2]}</option>
        )
    })}
</select>
                        </Form.Group>
                        
                        </div>
                        {
                            submitAlert?
                                <Alert variant="success" className="h6 mx-3">Subscription created successfully!!</Alert>
                                : null
                        }
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* <Footer/> */}
        </>
    );
}

export default Master;
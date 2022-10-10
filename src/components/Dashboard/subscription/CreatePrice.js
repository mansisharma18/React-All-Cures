import React, { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import axios from 'axios';
import { backendHost } from '../../../api-config';
import { userId } from '../../UserId'

function  Master(props) {
    const [amount, setAmount] = useState()
    const [details, setDetails] = useState()
    const [status, setStatus] = useState()
    const [submitAlert, setAlert] = useState(false)
    
    const submitForm = (e) => {
        e.preventDefault();
        axios.post(`${backendHost}/admin/create/price_table`, {
            // "subscription_id": id,
            "details":details ,
            "status":status ,
            "amount": amount,
        })
        .then(res => {
            setAlert(true)
            setAmount('')
            setDetails('')
            setStatus('')
            setTimeout(() => {
                setAlert(false)
            }, 4000);
        })
        .catch(res => {return})
    }
    return(
        <>
            {/* <Header/> */}
            <div className="promo-page">
                <div className="container">
                    <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Price Details</div>
                        <form onSubmit={submitForm}>
                            <div className="row m-4">
                        {/* <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Subscription Id</Form.Label>
                            <Form.Control value={id} onChange={(e) => setId(e.target.value)} type="text" name=""
                            placeholder="Subscription Id here..." required/>
                        </Form.Group> */}
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Amount</Form.Label>
                            <Form.Control type="text" value={amount} onChange={(e) => setAmount(e.target.value)} name=""
                            placeholder="Enter Amount..." required/>
                        </Form.Group>
                        


                        
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Price Details</Form.Label>
                            <Form.Control type="text" name="" value={details} onChange={(e) => setDetails(e.target.value)} 
                            placeholder=" Details..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Price Status</Form.Label>
                            <Form.Control type="text" name="" value={status} onChange={e => setStatus(e.target.value)}
                             placeholder=" Status..." required/>
                        </Form.Group>
                      
                        </div>
                        {
                            submitAlert?
                                <Alert variant="success" className="h6 mx-3">Price created successfully!!</Alert>
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
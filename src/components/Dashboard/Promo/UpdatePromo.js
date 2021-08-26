import React, {useState, useEffect} from 'react';
import { Alert, Form } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import {useLocation} from "react-router-dom";
import history from '../../history';

export default function UpdatePromo(props){
    const [code, setCode] = useState('')
    const [startDate, setStart] = useState()
    const [endDate, setEnd] = useState()
    const [maxLimit, setMax] = useState()
    const [updatedBy, setUpdatedBy] = useState(Cookies.get('acPerm'))
    const [active, setActive] = useState()
    const [submitAlert, setAlert] = useState(false)
    const [promoData, setPromo] = useState([])

    
    const search = useLocation().search;  
    const id = new URLSearchParams(search).get('edit');
    console.log('IIIIIIIDDDDDDDDDDDD: ', id)

    const fetchPromo = (e) => {
        axios.get(`/promo/${id}`)
        .then(res => {
            console.log(res.data[0])
            setPromo(res.data)
            setCode(res.data[0].promo_code)
            setStart(res.data[0].promo_start_datetime.split('T')[0])
            setEnd(res.data[0].promo_end_datetime.split('T')[0])
            setMax(res.data[0].promo_max_limit)
            setActive(res.data[0].promo_active)
            console.log('Start: ', startDate)
        })
        .catch(res => console.log(res))
    }

    useEffect(() => {
        document.title = "All Cures | Dashboard | Update Promo"
        fetchPromo();
    }, [])

    const submitForm = (e) => {
        e.preventDefault();
        axios.put(`/promo/${id}`, {
            "promo_code": code,
            "promo_start_datetime": startDate,
            "promo_end_datetime": endDate,
            "promo_max_limit": maxLimit.toString(),
            "promo_active": active.toString(),
            "promo_updated_by": updatedBy.split('|')[0],
        })
        .then(res => {
            history.back()
        })
        .catch(res => console.log(res))
    }

    return(
            <div className="container">
                <div className="card my-3">
                    <div className="card-title h3 text-center py-2 border-bottom">Update Campaign Details</div>
                    <form onSubmit={submitForm}>
                        <div className="row m-4">
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Promo Code</Form.Label>
                            <Form.Control value={code} onChange={(e) => setCode(e.target.value)} type="text" name=""
                            placeholder="Promo code here..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Campaign Start Date</Form.Label>
                            <Form.Control type="Date" defaultValue={startDate} onChange={(e) => setStart(e.target.value)} name=""
                            placeholder="Start Date here..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Campaign End Date</Form.Label>
                            <Form.Control defaultValue={endDate} onChange={(e) => setEnd(e.target.value)} type="Date" name=""
                            placeholder="Start Date here..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Campaign's Maximum Limit</Form.Label>
                            <Form.Control type="text" name="" value={maxLimit} onChange={(e) => setMax(e.target.value)} 
                            placeholder="Maximum Limit here..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left">
                            <Form.Label>Campaign's Active Status</Form.Label>
                            <Form.Control type="text" name="" value={active} onChange={e => setActive(e.target.value)}
                             placeholder="1 for active & 0 for not-active..." required/>
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
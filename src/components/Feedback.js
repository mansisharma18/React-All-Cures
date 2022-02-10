
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import axios from 'axios';
import { backendHost } from '../api-config';
import { Link } from 'react-router-dom';
import { Alert, Form } from 'react-bootstrap';




function Feedback() {
    const[name,setName] = useState();
    const[first,setFirst] = useState();
    const[email,setEmail] = useState();
    const[number,setNumber] = useState('');
    const[feedback,setFeedback] = useState();
    const[alert,setAlert] = useState();
    
    const submitForm = (e) => {
        e.preventDefault();
        axios.post(`${backendHost}admin/create/feedback  `, {
            "firstname":first,
            "lastname": name,
            "email": email,
            "phonenumber": parseInt(number),
            "feedback": feedback,
         
        })
        .then(res => {
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 4000);
        })
        .catch(res => console.log(res))
    }
 
  return (
      <div>
                <Header/>    
          
          <div className="promo-page">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">We would love to hear from you. Please share any feedback</div>
                        <form onSubmit={submitForm}>
                            <div className="row m-4">
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Your First Name</Form.Label>
                            <Form.Control  value={first} onChange={(e) => setFirst(e.target.value)} type="text" name=""
                            placeholder="Enter Your First Name..." required/>
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Your Middle Name</Form.Label>
                            <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" name=""
                            placeholder="Enter Your Middle Name..." />
                        </Form.Group>
                       
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Your Email</Form.Label>
                            <Form.Control  value={email} onChange={(e) => setEmail(e.target.value)} type="text" name=""
                            placeholder="Enter Your Email..."
                            />
                        </Form.Group>
                        <Form.Group className="col-md-6 float-left" style={{zIndex: 2}}>
                            <Form.Label>Enter Your Phone Number</Form.Label>
                            <Form.Control value={number} onChange={(e) => setNumber(e.target.value)} type="text" name=""
                            placeholder="Enter Your Phone Number..." />
                        </Form.Group>
                        <Form.Group className="col-md-12 float-left"  style={{zIndex: 2}}>
                            <Form.Label>Enter Your Feedback</Form.Label>
                            {/* <Form.Control  id='td'value={feedback} onChange={(e) => setFeedback(e.target.value)}  type="text" name=""
                            placeholder="Enter Your Feedback..." /> */}
                            <Form.Control
        Value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        as="textarea"
        placeholder="Enter Your Feedback"
        style={{ height: '100px' }}
      />
                             
                        </Form.Group>
                        {
                            alert?
                                <Alert variant="success" className="h6 mx-3">Thanks For Your Feedback!!</Alert>
                                : null
                        }
                     
                        </div>
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>


                    </div>
                    <Footer/>
                </div>
            </div>
   
                     
       
       
        

  );
}

export default Feedback;
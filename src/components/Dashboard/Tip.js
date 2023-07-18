
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

import axios from 'axios';
import { backendHost } from '../../api-config';
import { Link } from 'react-router-dom';
import { Alert, Form } from 'react-bootstrap';
import {userId} from "../UserId"





function Tip() {
  
    const[feedback,setFeedback] = useState();
    const[alert,setAlert] = useState();
    
    const submitForm = (e) => {
        e.preventDefault();
        axios.post(`${backendHost}/tip/create/user_id/${userId} `, {
            "tip_title":feedback,
         
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
                   
          
          <div className="promo-page">
                <div className="container">
                <div className="card my-3">
                        <div className="card-title h3 text-center py-2 border-bottom">Hi Team, Add Your Tip Of The Day Here</div>
                        <form onSubmit={submitForm}>
                            <div className="row m-4">

                       
                       
                        <Form.Group className="col-md-12 float-left"  style={{zIndex: 2}}>
                            <Form.Label>Write Tip Of The Day Here !</Form.Label>
                            {/* <Form.Control  id='td'value={feedback} onChange={(e) => setFeedback(e.target.value)}  type="text" name=""
                            placeholder="Enter Your Feedback..." /> */}
                            <Form.Control
        Value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        as="textarea"
        placeholder="Write Your Tip Of The Day" 
        style={{ height: '100px' } }
        required />
                             
                        </Form.Group>
                        {
                            alert?
                                <Alert variant="success" className="h6 mx-3">Thanks Team , Your Tip Has Created Successfully!!</Alert>
                                : null
                        }
                     
                        </div>
                        <div className="col-md-12 text-center">
                            <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
                        </div>
                        </form>
                    </div>


                    </div>
                   
                </div>


                
            </div>
   
                     
       
       
        

  );
}

export default Tip;

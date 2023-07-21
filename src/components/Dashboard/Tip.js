import React, { useState } from 'react';
import axios from 'axios';
import { backendHost } from '../../api-config';
import { Form, Alert } from 'react-bootstrap';
import { userId } from "../UserId";

function Tip() {
  const [feedback, setFeedback] = useState('');
  const [article, setArticle] = useState('');
  const [alert, setAlert] = useState(null);

  const submitForm = (e) => {
    e.preventDefault();


    axios.post(`${backendHost}/tip/create/user_id/${userId}`, {
      "tip_title": feedback,
      "article_id": parseInt(article),
    })
  .then(res => {
      if (res.data === 1) {
        setAlert('success');
      } else if (res.data === -1) {
        setAlert('not-published');
      } else {
        setAlert('error');
      }
    })
    .catch(err => {
      console.log(err);
      setAlert('error');
    });
  };

  return (
    <div>
      <div className="promo-page">
        <div className="container">
          <div className="card my-3">
            <div className="card-title h3 text-center py-2 border-bottom">Hi Team, Add Your Tip Of The Day Here</div>
            <form onSubmit={submitForm}>
              <div className="row m-4">
                <Form.Group className="col-md-12 float-left" style={{ zIndex: 2 }}>
                  <Form.Label>Write Tip Of The Day Here!</Form.Label>
                  <Form.Control
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    as="textarea"
                    placeholder="Write Your Tip Of The Day"
                    style={{ height: '100px' }}
                    required
                  />
                </Form.Group>

                <Form.Group className="col-md-6 float-left" style={{ zIndex: 2 }}>
                  <Form.Label>Enter Article Id <b>(Required)</b></Form.Label>
                  <Form.Control
                    value={article}
                    onChange={(e) => {
                      // Only allow numeric values in the input field
                      const numericRegex = /^[0-9]*$/;
                      if (e.target.value === '' || numericRegex.test(e.target.value)) {
                        setArticle(e.target.value);
                      }
                    }}
                    type="text"
                    name=""
                    placeholder="Enter Article id..."
                    required
                    pattern="[0-9]*" // Set the pattern to allow only numeric characters
                    title="Please enter only numeric characters." // Show this message on validation error
                  />
                </Form.Group>
              </div>

              <div className="col-md-12 text-center">
                <button type="submit" className="btn btn-dark col-md-12 mb-4">Submit</button>
              </div>
            </form>
            {alert === 'success' &&
              <Alert variant="success" className="h6 mx-3">Thanks Team, Your Tip Has Been Created Successfully!!</Alert>
            }
            {alert === 'error' &&
              <Alert variant="danger" className="h6 mx-3">Your tip could not be created, Please contact Development Team.</Alert>
            }
             {alert === 'not-published' &&
      <Alert variant="warning" className="h6 mx-3">Your Tip Should Not Be Created as Article Id is under review, please publish article first</Alert>
    }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tip;

import React, { useState } from 'react';
import Cookies from 'js-cookie';
// import CommentBox from 'react-commentbox';
import axios from 'axios';
import { backendHost } from '../api-config';
import ArticleRating from "./ArticleRating";
import { Button, Modal, Alert } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
 
const Comment = ({refreshComments,article_id}, props) => {
    const [cmtText,setCmtText] = React.useState('')
    const [succAlert, setAlert] = useState('')
    const [show, setShow] = useState(false);
    const [ratingValue, setRatingValue] = React.useState([]);
    // const [submitAlert, setAlert] = useState(false)
   

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    
    const postComment = (e) => {
        e.preventDefault()

        if(cmtText !== '') {
            axios.post(`${backendHost}/DoctorRatingActionController?comments=${cmtText}&ratedbyid=${Cookies.get("acPerm").split('|')[0]}&ratedbytype=${Cookies.get("acPerm").split('|')[1]}&targetid=${article_id}&targetTypeid=2&cmd=rateAsset`)
            .then(res => {
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                }, 8000);
                // window.location.reload(false);
                 
            })
            
            .then(err => {
                console.log(err);
            })
            .catch(err =>{
                console.log(err);
            })
            refreshComments()
            
        }else {
            alert('Enter comment')
        }
        
        
    }
    const postRating = (rating) => {

        axios.post(`${backendHost}/DoctorRatingActionController?ratingVal=${rating}&ratedbyid=${Cookies.get("acPerm").split('|')[0]}&ratedbytype=${Cookies.get("acPerm").split('|')[1]}&targetid=${article_id}&targetTypeid=2&cmd=rateAsset`)
        // .then(res => console.log(res)
        .then(res => {
          setAlert(true)
        
          setTimeout(() => {
              setAlert(false)
          }, 4000);
      })
      .catch(res => console.log(res))
        
        
      }
      const thirdExample = {
        size: 40,
        count: 5,
        isHalf: false,
        value: 0,
        color: "yellow",
        activeColor: "orange",
        // filledIcon:"orange",
        onChange: newValue => {
          setRatingValue(newValue)
          
          postRating(newValue)
        }
      };
    // console.log('chekeing: ', props.article_id)
    return (
        <>
        <Button variant="primary" onClick={handleShow}>
        Write A review For This Cure
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="bg-review py-3" closeButton>
          <Modal.Title className="pl-4">Review</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <h3 className="pl-4">Overall Rating</h3>
        <div  className="pl-4">
        {/* <ArticleRating article_id={props.article_id}/><hr/>  */}
        <ReactStars {...thirdExample} />
        {
      succAlert?
          <Alert variant="success" className="h6 mx-3">You rate this cure successfully!!</Alert>
          : null
  }
        </div>
        
        <div className="pl-4">
                <form action="" onSubmit={(e) => postComment(e)} className="form-group">
                    <label htmlFor="" className="h4 font-weight-bold">Comments</label>
                    <textarea name="" 
                    onChange={(e) => {
                        setCmtText(e.target.value)
                    }}
                    className="form-control" id="comment" cols="40" rows="4"></textarea>
                    
                    {
                            succAlert?
                                <Alert variant="success" className="h6 mx-3">comment  successfully,,,Comment gone for Approval Stage ..!!</Alert>
                                : null
                        }
                    <div className="my-4">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
           
        </>
    )
}
 
      
       

export default Comment; 
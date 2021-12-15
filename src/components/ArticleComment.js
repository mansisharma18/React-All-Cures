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
    const [show, setShow] = useState(false);
    const [ratingValue, setRatingValue] = React.useState([]);
    const [showAlert, setShowAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState(true)

    const [afterSubmitLoad, setafterSubmitLoad] = useState(false)

    function Alert(msg){
      setShowAlert(true)
      setAlertMsg(msg)
      setTimeout(() => {
         setShowAlert(false)
      }, 1000);
    }
    
   

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    
    const postComment = (e) => {
      setafterSubmitLoad(true)

        e.preventDefault()

        if(cmtText !== '') {
            axios.post(`${backendHost}/DoctorRatingActionController?comments=${cmtText}&ratedbyid=${Cookies.get("acPerm").split('|')[0]}&ratedbytype=${Cookies.get("acPerm").split('|')[1]}&targetid=${article_id}&targetTypeid=2&cmd=rateAsset`)
            .then(res => {
              if(res.data === 1){
                setafterSubmitLoad(false)
                setShow(false)
                Alert('You have added your comment successfully!')
              } else {
                setafterSubmitLoad(false)
                
              Alert('Some error occured! Please try again later')
              }
            })
            .catch(err =>{
              setafterSubmitLoad(false)
              Alert('Some error occured! Please try again later')
                console.log(err);
            })
            refreshComments()
            
        }else {
          setafterSubmitLoad(false)
            Alert('Enter comment')
        }
        
        
    }
    const postRating = (rating) => {
        setafterSubmitLoad(true)
        axios.post(`${backendHost}/DoctorRatingActionController?ratingVal=${rating}&ratedbyid=${Cookies.get("acPerm").split('|')[0]}&ratedbytype=${Cookies.get("acPerm").split('|')[1]}&targetid=${article_id}&targetTypeid=2&cmd=rateAsset`)
        .then(res => {
          if(res.data === 1){
          setafterSubmitLoad(false)
          // setShow(false)
          Alert('You have rated this cure! Thanks')
          } else {
            
          setafterSubmitLoad(false)
          // setShow(false)
          Alert('Some error occured! Please try again later.')
          }
      })
      .catch(res => {
        setafterSubmitLoad(false)
        // setShow(false)
        Alert('Some error occured! Please try again later.')
      })
        
        
      }
      const thirdExample = {
        size: 40,
        count: 5,
        isHalf: false,
        value: 0,
        color: "yellow",
        activeColor: "orange",
        onChange: newValue => {
          setRatingValue(newValue)
          
          postRating(newValue)
        }
      };
    return (
        <>
        {
          showAlert &&
            <div className="alert alert-success pop-up border-bottom">
              <div className="h5 mb-0 text-center">{alertMsg}</div>
              <div className="timer"></div>
            </div>
        }
        {
                afterSubmitLoad &&
                <div className="loader main on-submit-loading">
                    <i className="fa fa-spinner fa-spin fa-10x" />
                </div>
            }
        <Button className="ml-3 h-75 btn-article-search mb-4" id="textComment" onClick={handleShow}>
        Review This Cure
      </Button>

      <Modal show={show} onHide={handleClose} className="rounded mt-5" >
        <Modal.Header className="bg-review py-3" closeButton>
          <Modal.Title className="pl-4">Review here...</Modal.Title>
        </Modal.Header>
        
        <Modal.Body className="rounded">
        <h3 className="pl-4"></h3>
        <div  className="pl-4">
        <ReactStars {...thirdExample} />
        </div>
        
        <div className="pl-4">
                <form action="" onSubmit={(e) => postComment(e)} className="form-group">
                    <label htmlFor="" className="h4 font-weight-bold">Comments</label>
                    <textarea name="" 
                    onChange={(e) => {
                        setCmtText(e.target.value)
                    }}
                    className="form-control" id="comment" cols="30" rows="4"></textarea>
                    
                    <div className="my-4">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </Modal.Body>
        <Modal.Footer>
       
        </Modal.Footer>
      </Modal>
           
        </>
    )
}
 
      
       

export default Comment; 
import React, { useState } from 'react';
import Cookies from 'js-cookie';
// import CommentBox from 'react-commentbox';
import axios from 'axios';
import { Alert} from 'react-bootstrap';
import { backendHost } from '../api-config';
import ArticleRating from "./ArticleRating";
 
const Comment = ({refreshComments,article_id}) => {
    const [cmtText,setCmtText] = React.useState('')
    const [succAlert, setAlert] = useState('')
    const [show, setShow] = useState(false);
   

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
                }, 4000);
                window.location.reload(false);
                 
            })
            
            .then(err => {
                console.log(err);
            })
            refreshComments()
            
        }else {
            alert('Enter comment')
        }
        
        
    }

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
        Write A review For This Cure
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="pl-4"> Create Review For This Cure</Modal.Title>
        </Modal.Header><hr/>
        
        <Modal.Body>
        <h3 className="pl-4">Overall Rating</h3>
        <div  className="pl-4">
        <ArticleRating article_id={props.article_id}/><hr/> 
        </div>
        
        <div className="pl-4">
                <form action="" onSubmit={(e) => postComment(e)} className="form-group">
                    <label htmlFor="" className="h4 font-weight-bold">Comments</label>
                    <textarea name="" 
                    onChange={(e) => {
                        setCmtText(e.target.value)
                    }}
                    className="form-control" id="" cols="40" rows="4"></textarea>
                    
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
           
        </>
    )
}
 
      
       

export default Comment; 
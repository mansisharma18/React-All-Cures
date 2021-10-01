import React, { useState } from 'react';
// import CommentBox from 'react-commentbox';
import axios from 'axios';
import { Dropdown, Button, DropdownButton, Nav, Modal, Alert} from 'react-bootstrap';
 
const Comment = ({refreshComments, docid}) => {

    const [cmtText,setCmtText] = React.useState('')
    const [succAlert, setAlert] = useState('')
   


    const postComment = (e) => {
        e.preventDefault()

        if(cmtText != '') {
            axios.post(`/DoctorRatingActionController?ratingVal=3&comments='${cmtText}'&ratedbyid=1&ratedbytype=1&targetid=1&targetTypeid=${docid}&cmd=rateAsset`)
            .then(res => {
               
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                }, 4000);
                // window.location.reload(false);
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
            <div>
                <form action="" onSubmit={(e) => postComment(e)} className="form-group">
                    <label htmlFor="">Comment</label>
                    <textarea name="" 
                    onChange={(e) => {
                        setCmtText(e.target.value)
                    }}
                    className="form-control" id="" cols="30" rows="10"></textarea>
                    
                    {
                            succAlert?
                                <Alert variant="success" className="h6 mx-3">comment  successfully!!</Alert>
                                : null
                        }
                    <div className="my-4">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}
 
      
       

export default Comment; 
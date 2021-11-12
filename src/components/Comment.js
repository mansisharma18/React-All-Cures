import React, { useState } from 'react';
import Cookies from 'js-cookie';
// import CommentBox from 'react-commentbox';
import axios from 'axios';
import { Dropdown, Button, DropdownButton, Nav, Modal, Alert} from 'react-bootstrap';
import { backendHost } from '../api-config';

const Comment = ({refreshComments, docid}) => {
    const acPerm = Cookies.get("acPerm")

    const [cmtText,setCmtText] = React.useState('')
    const [succAlert, setAlert] = useState('')
   


    const postComment = (e) => {
        e.preventDefault()

        if(cmtText != '') {
            axios.post(`${backendHost}/DoctorRatingActionController?ratingVal=3&comments='${cmtText}'&ratedbyid=${Cookies.get("acPerm").split('|')[0]}&ratedbytype=${Cookies.get("acPerm").split('|')[1]}&targetid=${docid}&targetTypeid=1&cmd=rateAsset`)
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
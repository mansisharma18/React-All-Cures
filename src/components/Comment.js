import React from 'react';
// import CommentBox from 'react-commentbox';
import axios from 'axios';
 
const Comment = ({refreshComments}) => {

    const [cmtText,setCmtText] = React.useState('')


    const postComment = (e) => {
        e.preventDefault()

        if(cmtText != '') {
            axios.post(`/DoctorRatingActionController?ratingVal=3&comments='${cmtText}'&ratedbyid=1&ratedbytype=1&targetid=1&targetTypeid=1&cmd=rateAsset`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
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
                    <div className="my-4">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}
 
      
       

export default Comment; 
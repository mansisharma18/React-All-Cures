import React, { useState, useEffect } from "react";
import { backendHost } from "../../api-config";
import { userId } from "../UserId";
import Header from "./Header";
import Footer from '../Footer/Footer';
const DeleteUserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reason, setReason] = useState("");
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [deactivationSuccess, setDeactivationSuccess] = useState(null);
  const [reasons, setReasons] = useState([]);
  const [selectedReason, setSelectedReason] = useState(null);

  useEffect(() => {
    fetch(`${backendHost}/cures/data/reasons`)
      .then(response => response.json())
      .then(data => setReasons(data));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsDeactivating(true);
    setDeactivationSuccess(null);
    try {
      fetch(`${backendHost}/data/deactivate/${userId}/${selectedReason}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedReason }),
      })   .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      }).catch(err=>{
      console.log(err)
  })
    
      setDeactivationSuccess(true);
    } catch (error) {
      setDeactivationSuccess(false);
    } finally {
      setIsDeactivating(false);
    }};

  return (
  
    <div>
      <Header/>
      <div className="container mb-30" >
      <form onSubmit={handleSubmit}>
        <p>Why do you want to delete your profile?</p><br/>
        <select name="reason" id="reason" onChange={(e) => setSelectedReason(e.target.value)}>
        <option value="">Select a reason</option>
        {reasons.map((reason) => (
          <option key={reason.Reason_id} value={reason.Reason_id}>
            {reason.Reason}
          </option>
        ))}
      </select><br/>
      <button type="submit"  class="btn mt-3 btn-dark" disabled={isDeactivating}>
        {isDeactivating ? 'Deactivating...' : 'Deactivate Profile'}
      </button>
      {deactivationSuccess === null ? null : deactivationSuccess ? (
        <p>Profile deactivated successfully.</p>
      ) : (
        <p>Failed to deactivate profile, please try again later.</p>
      )}
    </form>
   
 </div> <Footer/></div>
     
    
  );
};

export default DeleteUserProfile;

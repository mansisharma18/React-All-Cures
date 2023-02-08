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
 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsDeactivating(true);
    setDeactivationSuccess(null);
    try {
      const response = await fetch(`${backendHost}/data/deactivate/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
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
      <select value={reason} onChange={(e) => setReason(e.target.value)}>
        <option value="">Please select a reason</option>
        <option value="not_interested">Not interested</option>
        <option value="privacy_concerns">Privacy concerns</option>
        <option value="found_alternative">Found alternative</option>
        <option value="other">Other</option>
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
 </div></div>
     
    
  );
};

export default DeleteUserProfile;

import React, { useState, useEffect } from "react";
import { backendHost } from "../../api-config";
import { userId } from "../UserId";
import Header from "./Header";
import Footer from '../Footer/Footer';
const DeleteUserProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reason, setReason] = useState("");


  useEffect(() => {
    const deleteProfile = async (usr_id) => {
      setIsLoading(true);
      try {
        await fetch(`${backendHost}/data/deactivate/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reason }),
        });
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    deleteProfile(userId);
  }, [reason]);

  if (isLoading) {
    return <p>Deleting profile...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
  
    <div>
      <Header/>
      <div className="container mb-30" >

     
      <p>Why do you want to delete your profile?</p>
      <select value={reason} onChange={(e) => setReason(e.target.value)}>
        <option value="">Please select a reason</option>
        <option value="not_interested">Not interested</option>
        <option value="privacy_concerns">Privacy concerns</option>
        <option value="found_alternative">Found alternative</option>
        <option value="other">Other</option>
      </select>
      {reason !== "" && (
        <p>Profile deleted successfully! Reason: {reason}</p>
      )}
       </div>
      <Footer></Footer>
    </div>
    
  );
};

export default DeleteUserProfile;

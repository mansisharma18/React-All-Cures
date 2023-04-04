import React, { useState } from "react";
import { backendHost } from "../../api-config";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import ChatWindow from "./ChatWindow"
import axios from "axios";
import { userId } from "../UserId";

import './ChatPopup.css'

function ChatButton(props) {
  const { items } = props;
  const [alert, setAlert] = useState();
  const [chats, setChats] = useState([]);
  const [showChatWindow, setShowChatWindow] = useState(false);


  

  const checkChat = (fromId, toId) => {
    axios
      .get(`${backendHost}/chat/${fromId}/${toId}`)
      .then((res) => {
        const chatId = res.data[0].Chat_id;
        if (chatId === null) {
          favouriteForm();
        } else {
          setAlert("Chat already exists");
          setChats(res.data);
       // Set the showChatWindow state to true to show the chat window
        }
      })
      .catch((err) => console.log(err));
  };

  const favouriteForm = () => {
    axios
      .post(`${backendHost}/chat/start/18/3`)
      .then((res) => {
        setAlert("Chat started");
        setTimeout(() => {
          setAlert(null);
        }, 4000);
      })
      .catch((err) => console.log(err));
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkChat(18, 3);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="favouriteForm">
        <div className={`chat-box-container ${isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={toggleChatBox} style={{marginTop:-290}}>
  
        <img
      src= {props.imageURL}
      alt="Chat Icon"
      style={{ width: "20px", marginRight: "10px" }}
    />
    <span style={{ fontSize: "16px", fontWeight: "bold" }}> {items.prefix} {items.docname_first} {items.docname_middle}{" "}
                              {items.docname_last}</span>
      </button>
      <div className="chat-box">
     


      
{chats.sort((a, b) => a.Time - b.Time).map((chat) => (

<div  key={userId ===3} className={` ${chat.From_id === 3 ? 'message-container sent' : ' message-container received'}`}>
{/* <p>
From: {chat.From} To: {chat.To}
</p> */}
<p> {chat.Message}</p>
<p> {chat.Time}</p> {/* Assuming time property is in the API response */}
</div>
))}

<ChatWindow/>
</div>
   
    </div>
        {/* <div style={{ position: "fixed", right: "20px", bottom: "20px" }}>
  <button
    type="submit"
    className="ml-3 mt-4 btn-article-search"
    style={{
      width: "243px",
      height: "37px",
      background: "#C8F5FF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0",
      border: "none",
      borderRadius: "5px",
    }}
  >
  
  </button>
</div>
 */}


      </form>

      <Modal
        show={showChatWindow}
        onHide={() => setShowChatWindow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Chat Window</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
<div className="chat-window">


      
        {chats.sort((a, b) => a.Time - b.Time).map((chat) => (

  <div  key={userId ===3} className={` ${chat.From_id === 3 ? 'message-container sent' : ' message-container received'}`}>
    {/* <p>
      From: {chat.From} To: {chat.To}
    </p> */}
    <p> {chat.Message}</p>
    <p> {chat.Time}</p> {/* Assuming time property is in the API response */}
  </div>
))}

<ChatWindow/>
  <Form>
    <Form.Group controlId="formMessage">
      <Form.Label></Form.Label>
      {/* <Form.Control type="text" placeholder="Type your message here" /> */}
    </Form.Group>
  </Form>
  </div>

</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowChatWindow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ChatButton;